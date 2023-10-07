import type { SlashCommandBuilder } from '@discordjs/builders';
import type { CommandInteraction } from 'eris';

export abstract class Command {
	cooldown: number = 3;
	ownerOnly: boolean = false;
  abstract slashCommandBuilder: SlashCommandBuilder;
  abstract run(interaction: commandInteraction): Promise<any> | any;
}

export type commandInteraction = CommandInteraction;