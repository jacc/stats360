import {z} from 'zod';
import {api} from '../../../../../server/api';

const schema = z.object({
	id: z.string(),
});

export default api({
	async GET({ctx, req}) {
		const api = await ctx.getLife360();

		const {id: circle} = schema.parse(req.query);

		return ctx.cache(`trips:${circle}`, async () => {
			const {members} = await api.getCircle(circle);

			const trips = await Promise.all(
				members.map(async member => {
					const memberTrips = await api.getUserTrips(circle, member.id);

					return {
						member: member.id,
						trips: memberTrips.sort((a, b) => b.topSpeed - a.topSpeed),
					} as const;
				}),
			);

			return trips;
		});
	},
});
