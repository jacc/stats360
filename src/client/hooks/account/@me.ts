import type AtMe from '../../../pages/api/account/@me';
import {endpoint} from '../create';

const create = endpoint<typeof AtMe>();
export const useUser = create(() => '/api/account/@me');
