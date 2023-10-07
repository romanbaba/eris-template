import { Command } from '@/classes/command.ts';
import { Event } from '@/classes/event.ts';
import type { ConfigData } from '@/types.ts';
import { Collection } from '@discordjs/collection';
import consola from 'consola';
import { Routes } from 'discord-api-types/v10';
import 'dotenv/config';
import { Client } from 'eris';
import fs from 'fs/promises';
import { getConfig } from './configLoader.ts';
import { rest } from './variables.ts';

export class Bot extends Client {
	public developers: string[] = [];
	public commands: Collection<string, Command> = new Collection();
	public events: Collection<string, Event[]> = new Collection();
	public config: ConfigData = getConfig();

	constructor() {
		super(getConfig().token, {
			intents: getConfig().intents,
			largeThreshold: getConfig().largeThreshold,
			rest: {
				ratelimiterOffset: getConfig().restOffset,
			},
		});
	}

	public async init() {
		this.on('error', (error) => {
			consola.error(error);
		});

		this.setDevelopers(this.config.developers);

		await this.reloadEvents();
		await this.reloadCommands();

		await this.connect();
	}

	public setDevelopers(ids: string[]) {
		this.developers = ids;
	}

	public addDeveloper(id: string) {
		this.developers.push(id);
	}

	public async reloadEvents() {
		this.events.forEach((categories) => {
			categories.forEach((event) => this.events.delete(event.name));
		});

		const foldersPath = './src/events';
		const eventFiles = (await fs.readdir(foldersPath, { withFileTypes: true }))
			.filter((dirent) => dirent.isFile() && dirent.name.endsWith('.ts') && !dirent.name.endsWith('.d.ts'));

		for await (const file of eventFiles) {
			const filePath = `../events/${file.name}`;
			const event = await import(filePath);

			const isEvent = this.verifyEventImport(event);
			if (!isEvent) continue;

			const { default: Listener } = event;
			const eventData = new Listener();

			const categories = this.events.get(eventData.name) ?? [];

			this.events.set(eventData.name, [ ...categories, eventData ]);
			consola.success(`Event "${file.name}" was recorded in category "${eventData.name}".`);
		}

		this.events.forEach((category) => {
			category.forEach((event) => {
				this[event.once ? 'once' : 'on'](event.name, (...params) => {
					event.run(...params);
				});
			});
		});
	}

	public async reloadCommands() {
		this.commands.forEach((command) => this.commands.delete(command.slashCommandBuilder.name));

		const foldersPath = './src/commands';
		const commandFolders = (await fs.readdir(foldersPath, { withFileTypes: true }))
			.filter((dirent) => dirent.isDirectory());

		const tsFiles = (await fs.readdir(foldersPath, { withFileTypes: true }))
			.filter((dirent) => dirent.isFile() && dirent.name.endsWith('.ts') && !dirent.name.endsWith('.d.ts'));

		for (const folder of commandFolders) {
			const commandsPath = `${foldersPath}/${folder.name}`;
			const commandFiles = (await fs.readdir(commandsPath, { withFileTypes: true }))
				.filter((dirent) => dirent.isFile() && dirent.name.endsWith('.ts') && !dirent.name.endsWith('.d.ts'));

			for await (const file of commandFiles) {
				const filePath = `../commands/${folder.name}/${file.name}`;
				const command = await import(filePath);

				const isCommand = this.verifyCommandImport(command);
				if (!isCommand) continue;

				const { default: SlashCommand } = command;
				const slashCommand = new SlashCommand();

				this.commands.set(slashCommand.slashCommandBuilder.name, slashCommand);
				consola.success(`The "${folder.name}/${file.name}" command has been successfully saved to memory.`);
			}
		}

		for await (const file of tsFiles) {
			const filePath = `../commands/${file.name}`;
			const command = await import(filePath);

			const isCommand = this.verifyCommandImport(command);
			if (!isCommand) continue;

			const { default: SlashCommand } = command;
			const slashCommand = new SlashCommand();

			this.commands.set(slashCommand.slashCommandBuilder.name, slashCommand);
			consola.success(`The "${file.name}" command has been successfully saved to memory.`);
		}

		await rest.put(Routes.applicationCommands(process.env['ID'] ?? ''), {
			body: this.commands.map((command) => command.slashCommandBuilder),
		});
		consola.info(`"${this.commands.size}" command was successfully updated by Discord API.`);
	}

	public verifyCommandImport(data: unknown): data is { default: { new(): Command } } {
		if (!data || typeof data !== 'object' || !('default' in data)) {
			return false;
		}

		return true;
	}

	public verifyEventImport(data: unknown): data is { default: { new(): Event } } {
		if (!data || typeof data !== 'object' || !('default' in data)) {
			return false;
		}

		return true;
	}
}