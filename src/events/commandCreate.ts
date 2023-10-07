import { bot } from '@/base/bot.ts';
import { Event, type Categories } from '@/classes/event.ts';
import { cooldownedUsers } from '@/modules/variables.ts';
import { embed } from '@/utils/embed.ts';
import { inlineCode } from '@discordjs/builders';
import { InteractionType } from 'discord-api-types/v10';
import { CommandInteraction } from 'eris';

export default class Listener extends Event {
	override name: Categories = 'interactionCreate';

	override async run(interaction: CommandInteraction) {
		const embedBuilder = () => embed(interaction);
		const isDeveloper = bot.config.developers.includes(interaction.member?.user?.id ?? '');

		if (interaction.type !== InteractionType.ApplicationCommand) return;

		const command = bot.commands.get(interaction.data.name);
		if (!command) return;

		const userKey = `${interaction.member?.user?.id}${interaction.guildID}`;
		const cooldownTime = cooldownedUsers.get(userKey);
		const currentDate = parseInt(`${Date.now() / 1000}`);

		if (cooldownTime) {
			const isExpired = cooldownTime <= currentDate;
			const remainingSeconds = cooldownTime - currentDate;
			if (!isExpired) {
				await interaction.createMessage({
					embeds: [
						embedBuilder()
							.setTitle('Hey, yavaşlamaya ne dersin?')
							.setDescription(`⏰ **|** Bu komutu ${inlineCode(`${remainingSeconds} saniye`)} sonra kullanabilirsin.`)
							.data,
					],
				});
				return;
			}
		}

		if (command.ownerOnly && !isDeveloper) {
			await interaction.createMessage({
				embeds: [
					embedBuilder()
						.setTitle('Bu komutu görüntüleme yetkin yok.')
						.setDescription(`❌ **|** Bu komutu kullanmak için ${inlineCode('Geliştirici')} yetkisine sahip olmalısın.`)
						.data,
				],
			});
			return;
		}

		await command.run(interaction);
		cooldownedUsers.set(userKey, command.cooldown + currentDate);
	}
}