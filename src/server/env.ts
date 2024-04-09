import {envsafe, str, url} from 'envsafe';

export const env = envsafe({
	UPSTASH_REDIS_REST_URL: url({
		desc: 'The URL of the Upstash redis REST API',
	}),

	UPSTASH_REDIS_REST_TOKEN: str({
		desc: 'The token of the Upstash redis REST API',
	}),

	DISCORD_INTERACTION_PUBLIC_KEY: str({
		desc: 'The public key of the Discord interaction API',
	}),

	DISCORD_TOKEN: str({
		desc: 'The token of the Discord bot',
	}),

	DISCORD_CLIENT_ID: str({
		desc: 'The client ID of the Discord bot',
	}),
});
