import {z} from 'zod';
import {api} from '../../../../server/api';

export default api({
	async GET({ctx, req}) {
		const {id} = z.object({id: z.string()}).parse(req.query);
		const api = await ctx.getLife360();
		return api.getCircle(id);
	},
});
