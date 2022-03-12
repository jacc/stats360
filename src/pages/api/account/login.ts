import {api} from '../../../server/api';

export default api({
	async POST({req, res, ctx}) {
		const session = await ctx.sessions.from(req).catch(() => null);

		if (session) {
			return;
		}

		// TODO: Get access token

		const token = await ctx.sessions.generate({
			life360: {
				access_token: '',
			},
		});

		res.setHeader('Set-Cookie', ctx.sessions.getCookie(token));
	},
});
