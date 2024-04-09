import {SlashCommandBuilder} from '@discordjs/builders';
import {reply} from '../reply';
import {createCommand} from './type';

export const ping = createCommand({
	builder: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pings the bot!'),

	async handler(ctx, interaction) {
		return reply.message({
			content: `Pong! <#${interaction.channel_id}>`,
		});
	},
});
