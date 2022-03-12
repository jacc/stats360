import {serialize} from 'cookie';
import {randomBytes} from 'crypto';
import dayjs from 'dayjs';
import {NextApiRequest} from 'next';
import {NextkitError} from 'nextkit';
import {getRedis} from './redis';

export async function getSessionToken(): Promise<string> {
	const token = randomBytes(64).toString('hex');

	if (await getRedis().get(`session:${token}`)) {
		return getSessionToken();
	}

	return token;
}

export class SessionManager<T> {
	public static readonly COOKIE_NAME = 'stats_sess';

	async generate(data: T) {
		const token = await getSessionToken();

		await getRedis().set(`session:${token}`, data, {
			ex: 1 * 60 * 60 * 24 * 30,
		});

		return token;
	}

	getCookie(token: string, expires = dayjs().add(1, 'month').toDate()) {
		return serialize(SessionManager.COOKIE_NAME, token, {
			expires,
			httpOnly: true,
			path: '/',
			secure: process.env.NODE_ENV !== 'development',
		});
	}

	async from(req: NextApiRequest) {
		const token = req.cookies[SessionManager.COOKIE_NAME];

		if (!token) {
			throw new NextkitError(401, 'You are not signed in');
		}

		const session = await this.get(token);

		if (!session) {
			throw new NextkitError(
				403,
				'You have been signed out! Please login again.',
			);
		}

		return session;
	}

	async get(token: string) {
		return getRedis().get<T>(`session:${token}`);
	}
}
