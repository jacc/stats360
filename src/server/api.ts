import {NextApiRequest} from 'next';
import createAPI from 'nextkit';
import {getRedis} from './redis';
import {SessionManager} from './sessions';
import {Life360API} from './utils/login';

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
		const sessions = new SessionManager<Session>();

		return {
			sessions,
			redis: getRedis(),
			async getLife360(req: NextApiRequest) {
				const session = await sessions.from(req);
				return new Life360API(session.life360.access_token);
			},
		};
	},
});
