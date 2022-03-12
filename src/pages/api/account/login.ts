import {loginSchema} from '../../../schemas/login';
import {api} from '../../../server/api';

export default api({
	async POST({req, res, ctx}) {
		const session = await ctx.sessions.from(req).catch(() => null);

		if (session) {
			return;
		}

		const body = loginSchema.parse(req.body);

		const api = API.from(body);

		const token = await ctx.sessions.generate({
			life360: {
				access_token: '',
			},
		});

		res.setHeader('Set-Cookie', ctx.sessions.getCookie(token));
	},
});
