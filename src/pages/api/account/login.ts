import {loginSchema} from '../../../schemas/login';
import {api} from '../../../server/api';
import {Life360API} from '../../../server/utils/life360';

export default api({
	async POST({req, res, ctx}) {
		const session = await ctx.sessions.from(req).catch(() => null);

		if (session) {
			if (req.headers['content-type'] === 'application/json') {
				return;
			}

			return {
				_redirect: '/dashboard',
			};
		}

		const body = loginSchema.parse(req.body);

		const api = await Life360API.login({
			username: body.email,
			password: body.password,
		});

		const token = await ctx.sessions.generate({
			life360: {
				access_token: api.getAccessToken(),
			},
		});

		res.setHeader('Set-Cookie', ctx.sessions.getCookie(token));

		if (req.headers['content-type'] === 'application/json') {
			return;
		}

		return {
			_redirect: '/dashboard',
		};
	},
});
