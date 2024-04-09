import {z} from 'zod';
import {api} from '../../../../../server/api';
import {calculateTripScore} from '../../../../../util/driver-score';

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

					const sortedTrips = memberTrips
						.sort((a, b) => b.topSpeed - a.topSpeed)
						.map(trip => ({
							...trip,
							score: calculateTripScore(trip),
						}));

					return {
						member: member.id,
						trips: sortedTrips,
						averageTripScore:
							sortedTrips.reduce((acc, trip) => acc + trip.score, 0) /
							sortedTrips.length,
					} as const;
				}),
			);

			return trips;
		});
	},
});
