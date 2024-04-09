import {
	ContextMenuCommandBuilder,
	SlashCommandBuilder,
} from '@discordjs/builders';
import {
	APIChatInputApplicationCommandInteraction,
	APIContextMenuInteraction,
	RESTPostAPIInteractionCallbackJSONBody,
} from 'discord-api-types/v10';
import type {APIContext} from '../../api';

export type Builders = SlashCommandBuilder | ContextMenuCommandBuilder;

export type GetInteraction<B> = B extends SlashCommandBuilder
	? APIChatInputApplicationCommandInteraction
	: B extends ContextMenuCommandBuilder
	? APIContextMenuInteraction
	: never;

export type Command<B extends Builders> = {
	builder: B;
	handler: (
		ctx: APIContext,
		interaction: GetInteraction<B>,
	) => Promise<RESTPostAPIInteractionCallbackJSONBody>;
};

export function createCommand<B extends Builders>(command: Command<B>) {
	const json = command.builder.toJSON();
	return {...command, type: json.type, json};
}
