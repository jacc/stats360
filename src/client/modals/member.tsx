import {Life360CircleMember} from '../../server/utils/types/circles.types';
import {createModal} from './create';
import Image from 'next/image';

import {TiLocationArrowOutline} from 'react-icons/ti';
import {BsBattery} from 'react-icons/bs';

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
			// content: <pre>{JSON.stringify(member.location, null, 4)}</pre>,
			content: (
				<div className="mt-4">
					<div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
						<div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
							<div>
								<div className="flex-shrink-0 flex items-center">
									<TiLocationArrowOutline />
									<h1 className="font-semibold text-sm sm:text-regular">
										Location
									</h1>
								</div>
							</div>
							<p className="text-xs">{member.location.name}</p>
						</div>
						<div>
							<div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
								<div className="flex-shrink-0 flex items-center space-x-1 ">
									<BsBattery />
									<h1 className="font-semibold text-sm sm:text-regular">
										Battery
									</h1>
								</div>
								<p className="text-xs">{member.location.battery}</p>
							</div>
						</div>
					</div>
				</div>
			),
		};
	},
);
