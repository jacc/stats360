import {Life360CircleMember} from '../../server/utils/types/circles.types';
import {createModal} from './create';

export const MemberModal = createModal<{member?: Life360CircleMember}>(
	props => {
		if (!props.options.member) {
			return {
				title: 'Loading...',
				content: 'Searching the interwebs...',
			};
		}

		const {member} = props.options;

		return {
			title: member.firstName,
			content: <pre>{JSON.stringify(member.location, null, 4)}</pre>,
		};
	},
);
