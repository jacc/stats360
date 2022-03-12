import createAPI from 'nextkit';
import {getRedis} from './redis';
import {SessionManager} from './sessions';

interface Session {
	life360: {
		access_token: string;
	};
}

export const api = createAPI({
	async onError(req, res, error) {
		return {
			status: 500,
			message: error.message,
		};
	},

	async getContext() {
		return {
			sessions: new SessionManager<Session>(),
			redis: getRedis(),
		};
	},
});
