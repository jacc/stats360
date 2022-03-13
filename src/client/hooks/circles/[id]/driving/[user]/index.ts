import type DrivingAPI from '../../../../../../pages/api/circles/[id]/driving';
import {endpoint} from '../../../../create';

const create = endpoint<typeof DrivingAPI>();
export const useTrips = create((circle: string | null) =>
	circle ? `/api/circles/${circle}/driving/` : null,
);
