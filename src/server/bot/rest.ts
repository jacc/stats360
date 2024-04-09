import Axios from 'axios';
import {env} from '../env';

export const bot = Axios.create({
	baseURL: 'https://discordapp.com/api/v9',
	headers: {
		Authorization: `Bot ${env.DISCORD_TOKEN}`,
	},
});
