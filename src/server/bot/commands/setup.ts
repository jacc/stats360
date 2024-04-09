import {SlashCommandBuilder} from '@discordjs/builders';
import {ComponentType} from 'discord-api-types/v10';
import {nullish} from '../assertions';
import {SETUP_SELECT_MENU} from '../components/ids';
import {reply} from '../reply';
import {createCommand} from './type';

export const setup = createCommand({
	builder: new SlashCommandBuilder()
		.setName('setup')
		.setDescription("Initialize a guild's Stats360 circle"),

	async handler(ctx, interaction) {
		nullish(interaction.guild_id, 'You must use this command in a server!');

		const existing = await ctx.redis.exists(`guild:${interaction.guild_id}`);

		if (existing !== 0) {
			return reply.error('This guild has already been configured!');
		}

		return reply.message({
			components: [
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.SelectMenu,
							custom_id: SETUP_SELECT_MENU,
							options: [],
							max_values: 1,
							min_values: 1,
						},
					],
				},
			],
		});
	},
});
