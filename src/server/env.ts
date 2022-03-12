import {envsafe, str, url} from 'envsafe';

export const env = envsafe({
	UPSTASH_REDIS_REST_URL: url({
		desc: 'The URL of the Upstash redis REST API',
	}),

	UPSTASH_REDIS_REST_TOKEN: str({
		desc: 'The token of the Upstash redis REST API',
	}),
});
