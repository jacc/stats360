import {useRouter} from 'next/router';
import {useCircle} from '../../../client/hooks/circles/[id]';
import Image from 'next/image';
import {useState} from 'react';
import {useLastValue} from '../../../client/hooks/last-value';
import {MemberModal} from '../../../client/modals/member';
import {Life360CircleMember} from '../../../server/utils/types/circles.types';
import {useTrips} from '../../../client/hooks/circles/[id]/driving/[user]';
import {Life360UserTrip} from '../../../server/utils/types/trip.types';
import {BackButton} from '../../../components/back-button';
import {AiOutlineCrown} from 'react-icons/ai';
import ordinal from 'ordinal';
import defaultAvatar from '../../../client/assets/default-avatar.png';

function useThisCircle() {
	const router = useRouter();

	const {data: circle} = useCircle(
		// Store last instance of circle so that we can navigate away
		// without losing the query param (allowing for page transition anims)
		useLastValue((router.query.circle as string) ?? null),
	);

	return circle;
}

export default function CirclePage() {
	const circle = useThisCircle();
	const {data: trips} = useTrips(circle?.id ?? null);

	const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
	const stableSelectedPerson = useLastValue(selectedPerson);

	return (
		<main className="mx-auto max-w-3xl md:py-4 px-4 pt-12 md:pt-[80px] py-8 space-y-6">
			<BackButton />
			<MemberModal
				isOpen={Boolean(selectedPerson)}
				options={{
					member: circle?.members.find(
						member => member.id === stableSelectedPerson,
					),
				}}
				close={() => {
					setSelectedPerson(null);
				}}
			/>

			<div className="rounded-xl bg-white dark:bg-gray-800 p-4 md:p-12 space-y-6 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
				<div className="flex items-center space-x-3">
					<h1 className="font-medium text-2xl">
						{circle?.name}'s Life360 Stats
					</h1>
				</div>

				<div className="space-y-4">
					<div className="font-medium text-lg">Members</div>

					<div className="rounded-xl bg-white dark:bg-gray-800 md:p-4 space-y-6 shadow-sm dark:shadow-neutral-800/25 font-light md:border border-gray-300 dark:border-gray-700">
						<div className="grid md:grid-cols-2 gap-2">
							{circle?.members
								.filter(member => member.issues.disconnected === '0')
								.map(member => {
									const battery = parseInt(member.location.battery, 10);
									const highBattery = battery >= 20;

									return (
										<button
											key={member.id}
											type="button"
											onClick={() => {
												setSelectedPerson(member.id);
											}}
										>
											<div className="flex items-center space-x-3 rounded-md p-4 border border-gray-200/25 bg-gray-100 dark:bg-gray-900/50 dark:border-gray-600/50">
												<div className="flex-shrink-0 flex items-center">
													{member && (
														<Image
															src={member.avatar ?? defaultAvatar}
															alt={member.firstName}
															height={24}
															width={24}
															className="object-cover rounded-full"
														/>
													)}
												</div>

												<div className="flex-grow flex justify-between">
													<p className="block font-medium">
														<span>{member.firstName}</span>

														<span className="opacity-50">
															&nbsp; {member.lastName}
														</span>
													</p>

													<div className="flex items-center mr-1">
														<span
															className={`relative block w-2 h-5 rounded-sm overflow-hidden ${
																highBattery
																	? 'border-green-500'
																	: 'border-red-500'
															} border`}
														>
															<span
																className={`w-2 block ${
																	highBattery ? 'bg-green-500' : 'bg-red-500'
																} absolute bottom-0`}
																style={{
																	height: `${battery}%`,
																}}
															/>
														</span>
													</div>
												</div>
											</div>
										</button>
									);
								})}
						</div>
					</div>
				</div>

				<div className="space-y-4">
					<div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
						<div>
							<div className="font-medium text-lg pb-2">Worst Drivers</div>
							<div className="rounded-xl bg-white dark:bg-gray-800 md:p-4 space-y-2 shadow-sm dark:shadow-neutral-800/25 font-light md:border border-gray-300 dark:border-gray-700">
								{trips
									?.sort(
										(memberA, memberB) =>
											memberA.averageTripScore - memberB.averageTripScore,
									)
									.filter(trip => trip.trips.length)
									.map((trip, index) => (
										<UserTrip key={trip.member} {...trip} position={index} />
									))}
							</div>
						</div>

						<div>
							<div className="font-medium text-lg pb-2">Top Safest Drivers</div>
							<div className="rounded-xl bg-white dark:bg-gray-800 sm:p-4 space-y-6 shadow-sm dark:shadow-neutral-800/25 font-light md:border border-gray-300 dark:border-gray-700" />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

function UserTrip({
	trips,
	member: memberId,
	position,
}: {
	trips: Life360UserTrip[];
	member: Life360CircleMember['id'];
	position: number;
}) {
	const circle = useThisCircle();

	const member = circle?.members.find(member => member.id === memberId);

	if (!member) {
		return null;
	}

	const positionColors = {
		0: 'text-yellow-500',
		1: 'dark:text-gray-300 text-gray-600',
		2: 'text-yellow-700',
	};

	return (
		<div className="flex items-center space-x-2 rounded-md pl-3 p-4 border border-gray-200/25 bg-gray-100 dark:bg-gray-900/50 dark:border-gray-600/50">
			<div className="flex w-full items-center space-x-2">
				<div className="flex-shrink-0 flex items-center">
					{member && (
						<Image
							className="rounded-full object-cover"
							src={member.avatar ?? defaultAvatar}
							alt="User"
							height={24}
							width={24}
						/>
					)}
				</div>

				<div className="flex flex-grow items-center w-full justify-between relative">
					<span className="absolute -top-1.5 opacity-50 align-middle select-none font-mono text-xs">
						{ordinal(position + 1)}
					</span>

					<p className="font-medium flex-shrink-0 h-3.5">{member.firstName}</p>

					<p className="flex space-x-2">
						{[0, 1, 2].includes(position) && (
							<>
								<AiOutlineCrown
									size={24}
									className={`inline-block ${
										positionColors[position as 0 | 1 | 2]
									}`}
								/>
								&nbsp;
							</>
						)}

						<span title="Average Driving Score">
							{Math.floor(
								trips.reduce((acc, trip) => trip.score + acc, 0) / trips.length,
							)}
							%
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}
