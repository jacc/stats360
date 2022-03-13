import createAPI from 'nextkit';
import {getRedis} from './redis';
import {SessionManager} from './sessions';
import {Life360API} from './utils/life360';

interface Session {
	life360: {
		access_token: string;
		user_id: string;
	};
}

export const api = createAPI({
	async onError(req, res, error) {
		console.warn(error);

		return {
			status: 500,
			message: error.message,
		};
	},

	async getContext(req) {
		const sessions = new SessionManager<Session>();

		const redis = getRedis();

		return {
			sessions,
			redis,

			async getSession() {
				return sessions.from(req);
			},

			async cache<T>(
				key: string,
				fn: () => Promise<T>,
				seconds = 1 * 60 * 60,
			): Promise<T> {
				const cached = await redis.get<T>(key);

				if (cached) {
					return cached;
				}

				const recent = await fn();

				if (recent) {
					await redis.set(key, recent, {
						ex: seconds,
					});
				}

				return recent;
			},

			async getLife360() {
				const session = await sessions.from(req);
				return new Life360API(session.life360.access_token);
			},
		};
	},
});
