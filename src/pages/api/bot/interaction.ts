import {verifyKey} from 'discord-interactions';
import {NextkitError} from 'nextkit';
import {z} from 'zod';
import {api} from '../../../server/api';
import {env} from '../../../server/env';
import {
	APIInteraction,
	InteractionResponseType,
	InteractionType,
} from 'discord-api-types/v10';
import {reply} from '../../../server/bot/reply';
import {commands} from '../../../server/bot/commands';
import {AssertionFailedError} from '../../../server/bot/assertions';

const signaturesSchema = z.object({
	'x-signature-ed25519': z.string(),
	'x-signature-timestamp': z.string(),
});

export default api.raw({
	async POST({req, ctx}) {
		const {
			'x-signature-ed25519': signature,
			'x-signature-timestamp': timestamp,
		} = signaturesSchema.parse(req.headers);

		const rawBody = JSON.stringify(req.body);

		const isValidRequest = verifyKey(
			rawBody,
			signature,
			timestamp,
			env.DISCORD_INTERACTION_PUBLIC_KEY,
		);

		if (!isValidRequest) {
			throw new NextkitError(400, 'Invalid signature');
		}

		const interaction = req.body as APIInteraction;

		switch (interaction.type) {
			case InteractionType.Ping: {
				return reply({
					type: InteractionResponseType.Pong,
				});
			}

			case InteractionType.ApplicationCommand: {
				const command = commands.find(
					command =>
						command.json.name === interaction.data.name &&
						(command.type as number) === interaction.type,
				);

				if (!command) {
					throw new NextkitError(400, 'Unknown interaction name provided!');
				}

				const result = await command
					// Typed as `never` because commands will be an array of many types of interactions,
					// and we don't want to have to type check each one (performance implications).
					.handler(ctx, interaction as never)
					.catch((error: Error) => {
						if (error instanceof AssertionFailedError) {
							return reply.error(error.message);
						}

						throw error;
					});

				return reply(result);
			}

			default: {
				throw new NextkitError(400, 'Unknown interaction type');
			}
		}
	},
});
