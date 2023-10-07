import { Command, type commandInteraction } from '@/classes/command.ts';
import { embed } from '@/utils/embed.ts';
import { SlashCommandBuilder } from '@discordjs/builders';

export default class SlashCommand extends Command {
	override slashCommandBuilder: SlashCommandBuilder = new SlashCommandBuilder()
		.setName('gecikme')
		.setDescription('Discord mesaj gecikmesini anlık olarak ölçüm sağlıyabilirsiniz.');

	override async run(interaction: commandInteraction) {
		await interaction.defer();

		const embedBuilder = () => embed(interaction);
		const message = await interaction.createFollowup({
			embeds: [
				embedBuilder()
					.setDescription('⏰ **|** Biraz bekleyiniz...')
					.data,
			],
		});

		const diff = message.createdAt - interaction.createdAt;

		await interaction.editMessage(message.id, {
			embeds: [
				embedBuilder()
					.setDescription(`🏸 **|** Hop! Bot gecikmesi **${diff}** milisaniye.`)
					.data,
			],
		});
	}
}