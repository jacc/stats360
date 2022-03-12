import {api} from '../../../../server/api';
import {Life360API} from '../../../../server/utils/life360';

export default api({
	async GET({ctx}) {
		const session = await ctx.getSession();

		return ctx.cache(`circles:${session.life360.user_id}`, async () => {
			const api = new Life360API(session.life360.access_token);
			return api.getCircles();
		});
	},
});
