import CirclesAPI from '../../../pages/api/users/@me/circles';
import {endpoint} from '../create';

const create = endpoint<typeof CirclesAPI>();
export const useMyCircles = create(() => '/api/users/@me/circles');
