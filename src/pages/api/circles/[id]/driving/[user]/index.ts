import {z} from 'zod';
import {api} from '../../../../../../server/api';

const schema = z.object({
	id: z.string(),
	user: z.string(),
});

export default api({
	async GET({ctx, req}) {
		const api = await ctx.getLife360();

		const {id: circle, user} = schema.parse(req.query);

		return ctx.cache(`trip:${circle}:${user}`, async () => {
			const trips = await api.getUserTrips(circle, user);
			return trips.sort((a, b) => b.topSpeed - a.topSpeed);
		});
	},
});
