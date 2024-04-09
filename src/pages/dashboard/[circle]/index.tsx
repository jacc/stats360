import {useRouter} from 'next/router';
import {useCircle} from '../../../client/hooks/circles/[id]';
import Image from '../../../components/Image';
import {useState} from 'react';
import {useLastValue} from '../../../client/hooks/last-value';
import {MemberModal} from '../../../client/modals/member';
import {Life360CircleMember} from '../../../server/utils/types/circles.types';
import {useTrips} from '../../../client/hooks/circles/[id]/driving/[user]';
import {Life360UserTrip} from '../../../server/utils/types/trip.types';
import {BackButton} from '../../../components/back-button';
import {AiOutlineCrown, AiOutlineQuestion} from 'react-icons/ai';
import ordinal from 'ordinal';
import defaultAvatar from '../../../client/assets/default-avatar.png';
import {useToggle} from 'alistair/hooks';
import {DriverModal} from '../../../client/modals/driver';
import {AlgoModel} from '../../../client/modals/driver-score';
import {SpeedsModel} from '../../../client/modals/top-speeds';
import dayjs from 'dayjs';
import {LeftModel} from '../../../client/modals/left';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

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

	const [algoOpen, {on: algoOn, off: algoOff}] = useToggle();
	const [speedOpen, {on: speedOn, off: speedOff}] = useToggle();
	const [leftOpen, {on: leftOn, off: leftOff}] = useToggle();
	const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);

	const selectedPerson = useLastValue(
		circle?.members.find(member => member.id === selectedPersonId) ?? null,
	);

	return (
		<main className="mx-auto max-w-3xl md:py-4 px-4 pt-12 md:pt-[80px] py-8 space-y-6">
			<BackButton />

			<MemberModal
				options={{member: selectedPerson ?? undefined}}
				isOpen={Boolean(selectedPersonId)}
				close={() => {
					setSelectedPersonId(null);
				}}
			/>

			<AlgoModel isOpen={algoOpen} close={algoOff} options={{}} />
			<SpeedsModel isOpen={speedOpen} close={speedOff} options={{}} />
			<LeftModel isOpen={leftOpen} close={leftOff} options={{}} />

			<div className="rounded-xl bg-white dark:bg-gray-800 p-4 md:p-12 space-y-6 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
				<div className="flex items-center space-x-3">
					<h1 className="font-medium text-2xl">
						{circle?.name}'s Life360 Stats
					</h1>
				</div>

				<div className="space-y-4">
					<div className="rounded-xl bg-white dark:bg-gray-800 md:p-4 space-y-2 shadow-sm dark:shadow-neutral-800/25 font-light md:border border-gray-300 dark:border-gray-700">
						<div className="font-medium text-lg">Members</div>
						<div className="grid md:grid-cols-2 gap-2">
							{circle?.members
								.filter(member => member.location)
								.filter(member => member.issues.disconnected === '0')
								.map(member => {
									const battery = parseInt(member.location.battery, 10);
									const highBattery = battery >= 20;

									return (
										<button
											key={member.id}
											type="button"
											onClick={() => {
												setSelectedPersonId(member.id);
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
						<div className="rounded-xl bg-white dark:bg-gray-800 md:p-4 space-y-2 shadow-sm dark:shadow-neutral-800/25 font-light md:border border-gray-300 dark:border-gray-700">
							<div className="flex justify-between items-center pb-2">
								<div className="font-medium text-lg">Recent Top Speeds</div>
								<button
									type="button"
									className="bg-white dark:bg-gray-800 hover:bg-pink-500/5 hover:text-pink-500 hover:border-pink-500/25 dark:hover:bg-pink-900/10 transition-all duration-150 group inline-block p-1 justify-between border rounded-lg dark:bg-gray-900/50 dark:border-gray-700"
									onClick={speedOn}
								>
									<AiOutlineQuestion size={20} />
								</button>
							</div>

							{trips
								?.filter(trip => trip.trips.length)
								.sort((memberA, memberB) => {
									if (memberA.trips.length === 0) {
										return -1;
									}

									if (memberB.trips.length === 0) {
										return 1;
									}

									return memberB.trips[0].topSpeed - memberA.trips[0].topSpeed;
								})
								.map((trip, index) => (
									<UserSpeeds key={trip.member} position={index} {...trip} />
								))}
						</div>
						<div className="rounded-xl bg-white dark:bg-gray-800 md:p-4 space-y-2 shadow-sm dark:shadow-neutral-800/25 font-light md:border border-gray-300 dark:border-gray-700">
							<div className="flex justify-between items-center pb-2">
								<div className="font-medium text-lg">Worst Drivers</div>
								<button
									type="button"
									className="bg-white dark:bg-gray-800 hover:bg-pink-500/5 hover:text-pink-500 hover:border-pink-500/25 dark:hover:bg-pink-900/10 transition-all duration-150 group inline-block p-1 justify-between border rounded-lg dark:bg-gray-900/50 dark:border-gray-700"
									onClick={algoOn}
								>
									<AiOutlineQuestion size={20} />
								</button>
							</div>
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
				</div>
				<div className="space-y-4">
					<div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
						<div className="rounded-xl bg-white dark:bg-gray-800 md:p-4 space-y-2 shadow-sm dark:shadow-neutral-800/25 font-light md:border border-gray-300 dark:border-gray-700">
							<div className="flex justify-between items-center pb-2">
								<div className="font-medium text-lg">Who Hasn't Left?</div>
								<button
									type="button"
									className="bg-white dark:bg-gray-800 hover:bg-pink-500/5 hover:text-pink-500 hover:border-pink-500/25 dark:hover:bg-pink-900/10 transition-all duration-150 group inline-block p-1 justify-between border rounded-lg dark:bg-gray-900/50 dark:border-gray-700"
									onClick={leftOn}
								>
									<AiOutlineQuestion size={20} />
								</button>
							</div>

							{circle?.members
								?.filter(member => member.location)
								.filter(member => member.location.startTimestamp)
								.sort(
									(memberA, memberB) =>
										parseInt(memberB.location.startTimestamp, 10) -
										parseInt(memberA.location.startTimestamp, 10),
								)
								.reverse()
								.filter(member => {
									const seconds =
										Math.floor(new Date().getTime() / 1000) -
										parseInt(member.location.startTimestamp, 10);

									return seconds > 10800;
								}).length
								? circle?.members
										?.filter(member => member.location)
										.filter(member => member.location.startTimestamp)
										.sort(
											(memberA, memberB) =>
												parseInt(memberB.location.startTimestamp, 10) -
												parseInt(memberA.location.startTimestamp, 10),
										)
										.reverse()
										.filter(member => {
											const seconds =
												Math.floor(new Date().getTime() / 1000) -
												parseInt(member.location.startTimestamp, 10);

											return seconds > 10800;
										})
										.slice(0, 7)
										.map((member, index) => (
											<UserLeft
												key={member.id}
												member={member.id}
												position={index}
												timestamp={member.location.startTimestamp}
											/>
										))
								: "Everyone's been out in the last 3 hours!"}
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
	const [modalOpen, {on, off}] = useToggle();
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
		<button
			type="button"
			className="w-full flex items-center space-x-2 rounded-md pl-3 p-4 border border-gray-200/25 bg-gray-100 dark:bg-gray-900/50 dark:border-gray-600/50"
			onClick={on}
		>
			<DriverModal isOpen={modalOpen} close={off} options={{trips}} />

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

					<div className="flex space-x-2">
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

						<p title="Average Driving Score Percentage">
							{Math.floor(
								trips.reduce((acc, trip) => trip.score + acc, 0) / trips.length,
							)}

							<span className="text-xs">%</span>
						</p>
					</div>
				</div>
			</div>
		</button>
	);
}

function UserSpeeds({
	trips,
	member: memberId,
	position,
}: {
	trips: Life360UserTrip[];
	member: Life360CircleMember['id'];
	position: number;
}) {
	const circle = useThisCircle();
	const fastestTrip = trips?.[0]?.topSpeed;

	const member = circle?.members.find(member => member.id === memberId);

	if (!fastestTrip || !member) {
		return null;
	}

	// Calculation: `mph = m/s * 2.237`
	const MS_TO_MPH = 2.237;

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
							{Math.ceil(fastestTrip * MS_TO_MPH)} mph
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}

function UserLeft({
	member: memberId,
	position,
	timestamp,
}: {
	timestamp: string;
	position: number;
	member: string;
}) {
	const circle = useThisCircle();

	const member = circle?.members.find(member => member.id === memberId);

	if (!member) {
		return null;
	}

	// Calculation: `mph = m/s * 2.237`

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
							{dayjs
								.duration(
									Math.floor(new Date().getTime() / 1000) -
										parseInt(timestamp, 10),
									'seconds',
								)
								.humanize()}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}
