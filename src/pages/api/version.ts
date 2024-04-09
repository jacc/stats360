import {api} from '../../server/api';

export default api({
	async GET() {
		return process.env.VERCEL_GIT_COMMIT_SHA ?? 'DEVELOPMENT';
	},
});
