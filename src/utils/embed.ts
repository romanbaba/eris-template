import { bot } from '@/base/bot.ts';
import { EmbedBuilder } from '@discordjs/builders';
import type { CommandInteraction } from 'eris';

export function embed(interaction: CommandInteraction) {
	return new EmbedBuilder()
		.setColor(interaction.user?.accentColor ?? 0x2C2F33)
		.setAuthor({
			name: `${interaction.member?.user?.username} (@${interaction.member?.user?.username})`,
			iconURL: `https://cdn.discordapp.com/avatars/${interaction.member?.user?.id}/${interaction.member?.user?.avatar}?size=1024`,
			url: `https://discord.com/users/${interaction.user?.id}`,
		})
		.setFooter({
			text: bot.user?.username,
			iconURL: `https://cdn.discordapp.com/avatars/${bot.user?.id}/${bot.user?.avatar}?size=1024`,
		})
		.setTimestamp();
}