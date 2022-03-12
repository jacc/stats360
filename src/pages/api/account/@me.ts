import {api} from '../../../server/api';

export default api({
	async GET({ctx, req}) {
		return (await ctx.getLife360(req)).getSelf();
	},
});
