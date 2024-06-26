import {api} from '../../../../server/api';
import {Life360API} from '../../../../server/utils/life360';

export default api({
	async GET({ctx, req}) {
		const session = await ctx.sessions.from(req);

		return ctx.cache(`user:${session.life360.user_id}`, async () => {
			const api = new Life360API(session.life360.access_token);
			return api.getSelf();
		});
	},
});
