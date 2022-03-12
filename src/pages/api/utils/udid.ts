import {api} from '../../../server/api';
import {AppleUtils} from '../../../server/utils/apple';

export default api({
	GET: async () => AppleUtils.randomUDID(),
});
