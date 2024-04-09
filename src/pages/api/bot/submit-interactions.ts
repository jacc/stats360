import {NextkitError} from 'nextkit';
import {z} from 'zod';
import {api} from '../../../server/api';
import {env} from '../../../server/env';
import {Routes} from 'discord-api-types/v10';
import {commands} from '../../../server/bot/commands';
import {bot} from '../../../server/bot/rest';

const schema = z.object({
	guild_id: z.string().optional(),
});

const commandsJson = commands.map(command => command.json);

export default api({
	async POST({req}) {
		if (req.headers.authorization !== env.DISCORD_TOKEN) {
			throw new NextkitError(401, 'Invalid authorization token');
		}

		const {guild_id = null} = schema.parse(req.body);

		const route = guild_id
			? Routes.applicationGuildCommands(env.DISCORD_CLIENT_ID, guild_id)
			: Routes.applicationCommands(env.DISCORD_CLIENT_ID);

		const promises = commandsJson.map(async body => bot.post(route, body));

		await Promise.all(promises);
	},
});
