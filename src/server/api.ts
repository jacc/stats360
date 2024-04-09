import createAPI, {GetAPIContext} from 'nextkit';
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

		const getSession = async () => sessions.from(req);

		return {
			sessions,
			redis,
			getSession,

			async cache<T>(
				key: string,
				fn: () => Promise<T>,
				seconds = 1 * 60 * 60 * 3,
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

			async getLife360(session?: Session) {
				const resolvedSession = session ?? (await getSession());
				return new Life360API(resolvedSession.life360.access_token);
			},
		} as const;
	},
});

export type APIContext = GetAPIContext<typeof api>;
