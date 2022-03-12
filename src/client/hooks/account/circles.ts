import CirclesAPI from '../../../pages/api/account/circles';
import {endpoint} from '../create';

const create = endpoint<typeof CirclesAPI>();
export const useMyCircles = create(() => '/api/account/circles');
