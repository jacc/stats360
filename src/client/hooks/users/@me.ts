import type AtMe from '../../../pages/api/users/@me';
import {endpoint} from '../create';

const create = endpoint<typeof AtMe>();
export const useUser = create(() => '/api/users/@me');
