import type DrivingAPI from '../../../../../../pages/api/circles/[id]/driving/[user]/index';
import {endpoint} from '../../../../create';

const create = endpoint<typeof DrivingAPI>();
export const useTrips = create(
	(circle, user) => `/api/circles/${circle}/driving/${user}`,
);
