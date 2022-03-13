import {useRouter} from 'next/router';
import {useCircle} from '../../../client/hooks/circles/[id]';
import Image from 'next/image';
import {useState} from 'react';
import {useLastValue} from '../../../client/hooks/last-value';
import {MemberModal} from '../../../client/modals/member';

export default function CirclePage() {
	const router = useRouter();

	const {data: circle} = useCircle((router.query.circle as string) ?? null);

	const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
	const stableSelectedPerson = useLastValue(selectedPerson);

	return (
		<main className="mx-auto max-w-3xl py-24 space-y-6">
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

			<div className="rounded-xl bg-white dark:bg-gray-800 p-12 space-y-6 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
				<div className="flex items-center space-x-3">
					<h1 className="font-medium text-2xl">
						{circle?.name}'s Life360 Stats
					</h1>
				</div>

				<div className="space-y-4">
					<div className="font-medium text-lg">Members</div>

					<div className="rounded-xl bg-white dark:bg-gray-800 p-4 space-y-6 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
						<div className="grid md:grid-cols-2 gap-4">
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
													{member.avatar && (
														<Image
															src={member.avatar}
															alt={member.firstName}
															height={24}
															width={24}
															className="object-cover rounded-full"
														/>
													)}
												</div>

												<div className="flex-grow flex justify-between">
													<div className="font-medium">{member.firstName}</div>

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
							<div className="font-medium text-lg pb-2">Top Driving Speeds</div>
							<div className="rounded-xl bg-white dark:bg-gray-800 p-4 space-y-6 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700"></div>
						</div>
						<div>
							<div className="font-medium text-lg pb-2">Top Safest Drivers</div>
							<div className="rounded-xl bg-white dark:bg-gray-800 p-4 space-y-6 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700"></div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
