import {Life360CircleMember} from '../../server/utils/types/circles.types';
import {createModal} from './create';

export const MemberModal = createModal<{member?: Life360CircleMember}>(
	props => ({
		title: props.options?.member?.firstName,
		content: (
			<pre>{JSON.stringify(props.options?.member?.location, null, 4)}</pre>
		),
	}),
);
