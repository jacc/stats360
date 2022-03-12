import type CircleAPI from '../../../../pages/api/circles/[id]/index';
import {endpoint} from '../../create';

const create = endpoint<typeof CircleAPI>();
export const useCircle = create((id: string | null) =>
	id ? `/api/circles/${id}` : null,
);
