import {
	APIInteractionResponseCallbackData,
	InteractionResponseType,
	RESTPostAPIInteractionCallbackJSONBody,
} from 'discord-api-types/v10';

/**
 * Utility function that ensures your body matches the expected type
 * @param data JSON Body to reply with
 * @returns The value put in
 */
export function reply(data: RESTPostAPIInteractionCallbackJSONBody) {
	return data;
}

reply.message = (data: APIInteractionResponseCallbackData) =>
	reply({
		type: InteractionResponseType.ChannelMessageWithSource,
		data,
	});

reply.error = (message: string) =>
	reply.message({
		embeds: [
			{
				title: 'An error occurred',
				description: message,
				color: 0xff0000,
			},
		],
	});
