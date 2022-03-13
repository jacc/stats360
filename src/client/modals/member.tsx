import {Life360CircleMember} from '../../server/utils/types/circles.types';
import {createModal} from './create';

import {TiLocationArrowOutline} from 'react-icons/ti';
import {BsBattery} from 'react-icons/bs';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import dayjs from 'dayjs';

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
			title: (
				<div>
					<span>
						{member.firstName}
						<span className="opacity-50">&nbsp; {member.lastName}</span>
					</span>
				</div>
			),
			content: (
				<div className="mt-4">
					<div className="grid grid-cols-1 gap-4">
						<div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
							<div>
								<div className="flex-shrink-0 flex items-center">
									<TiLocationArrowOutline />
									<h1 className="font-semibold text-sm sm:text-regular">
										Location
									</h1>
								</div>
							</div>
							<p className="text-xs">
								{member.location?.name ?? 'Unnamed place'} since{' '}
								{dayjs
									.unix(parseInt(member.location.startTimestamp, 10))
									.format('MMMM DD')}{' '}
								at{' '}
								{dayjs
									.unix(parseInt(member.location.startTimestamp, 10))
									.format('h:mma')}
							</p>
						</div>

						<div>
							<div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
								<div className="flex-shrink-0 flex items-center space-x-1 ">
									<BsBattery />
									<h1 className="font-semibold text-sm sm:text-regular">
										Battery
									</h1>
								</div>
								<p className="text-xs">
									{member.location.battery}%{' '}
									{member.location.charge === '1' ? '(charging)' : ''}
								</p>
							</div>
						</div>

						<div>
							<div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
								<div className="flex-shrink-0 flex items-center space-x-1 ">
									<AiOutlineInfoCircle />
									<h1 className="font-semibold text-sm sm:text-regular">
										Status
									</h1>
								</div>
								<p className="text-xs">
									{member.location.isDriving === '0'
										? 'Not moving'
										: `Moving at ${member.location.speed} mph`}
								</p>
							</div>
						</div>
					</div>
				</div>
			),
		};
	},
);
