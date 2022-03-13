import {createModal} from './create';

export const ErrorModal = createModal<{error: Error}>(props => ({
	title: props.options.error.name,
	content: props.options.error.message,
}));
