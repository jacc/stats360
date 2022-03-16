import {createModal} from './create';

import {AiFillWarning} from 'react-icons/ai';

import type API from '../../pages/api/circles/[id]/driving';
import {InferAPIResponse} from 'nextkit';
import {calculateScoreFor, Weighting} from '../../util/driver-score';

type Option = InferAPIResponse<typeof API, 'GET'>[number]['trips'];

function fix(value: number, digits = 1) {
	const int = Math.trunc(value);
	const float = Number(value - int);
	return int + parseFloat(float.toFixed(digits));
}

function average(arr: number[]) {
	return fix(arr.reduce((a, b) => a + b, 0) / arr.length);
}

function highest(arr: number[]) {
	return fix(arr.reduce((a, b) => Math.max(a, b), 0));
}

function result(arr: number[], key: Weighting) {
	const avg = average(arr);
	return (
		<>
			Averaging <span className="text-gray-500">{avg} </span> per trip,
			<span className="text-gray-500">
				-{fix(calculateScoreFor(key, avg))}
			</span>{' '}
			points
		</>
	);
}

export const DriverModal = createModal<{trips: Option}>(props => {
	const {trips} = props.options;

	return {
		title: 'Driver Score Calculation',
		content: (
			<div className="mt-4">
				<div className="grid grid-cols-1 gap-4">
					<a
						href="https://twitter.com/alistaiiiir"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block bg-yellow-500/25 text-yellow-500 px-3 py-1.5 rounded-full text-center"
					>
						<AiFillWarning className="inline-block" />
						&nbsp; The algorithm is in beta and may not be accurate!
					</a>
					<div>
						<div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
							<div className="flex-shrink-0 flex items-center space-x-1 ">
								<h1 className="font-semibold text-sm sm:text-regular">
									Total trips
								</h1>
							</div>
							<p className="text-xs">{trips.length} trips</p>
						</div>
					</div>
					<div>
						<div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
							<div className="flex-shrink-0 flex items-center space-x-1 ">
								<h1 className="font-semibold text-sm sm:text-regular">
									Times distracted during drives
								</h1>
							</div>
							<p className="text-xs">
								{result(
									trips.map(trip => trip.distractedCount),
									'distractedCount',
								)}
							</p>
						</div>
					</div>
					<div>
						<div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
							<div className="flex-shrink-0 flex items-center space-x-1 ">
								<h1 className="font-semibold text-sm sm:text-regular">
									Times hard breaking during drives
								</h1>
							</div>
							<p className="text-xs">
								{result(
									trips.map(trip => trip.hardBrakingCount),
									'distractedCount',
								)}
							</p>
						</div>
					</div>
					<div>
						<div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
							<div className="flex-shrink-0 flex items-center space-x-1 ">
								<h1 className="font-semibold text-sm sm:text-regular">
									Times speeding during drives
								</h1>
							</div>
							<p className="text-xs">
								{result(
									trips.map(trip => trip.speedingCount),
									'speedingCount',
								)}
							</p>
						</div>
					</div>
					<div>
						<div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
							<div className="flex-shrink-0 flex items-center space-x-1 ">
								<h1 className="font-semibold text-sm sm:text-regular">
									Times rapidly accelerated during drives
								</h1>
							</div>
							<p className="text-xs">
								{result(
									trips.map(trip => trip.rapidAccelerationCount),
									'rapidAccelerationCount',
								)}
							</p>
						</div>
					</div>
					<div>
						<div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
							<div className="flex-shrink-0 flex items-center space-x-1 ">
								<h1 className="font-semibold text-sm sm:text-regular">
									Average drive time
								</h1>
							</div>
							<p className="text-xs">
								<span className="text-gray-500">
									~{Math.floor(average(trips.map(trip => trip.duration)) / 60)}
								</span>{' '}
								minutes
							</p>
						</div>
					</div>
				</div>
			</div>

			// 	<div className="overflow-x-auto overflow-y-hidden h-full">
			// 		<table
			// 			style={{
			// 				margin: '0 -20px',
			// 				borderSpacing: '20px 0',
			// 				borderCollapse: 'separate',
			// 			}}
			// 		>
			// 			<thead>
			// 				<tr>
			// 					<th className="w-full whitespace-nowrap">Distractions</th>
			// 					<th className="w-full whitespace-nowrap">Hard Brakes</th>
			// 					<th className="w-full whitespace-nowrap">Speeding</th>
			// 					<th className="w-full whitespace-nowrap">Rapid Acceleration</th>
			// 					<th className="w-full whitespace-nowrap">Crashes 💀</th>
			// 					<th className="w-full whitespace-nowrap">Duration (mins)</th>
			// 				</tr>
			// 			</thead>

			// 			<tbody>
			// 				<tr>
			// 					<td className="text-4xl">
			// 						{result(
			// 							trips.map(trip => trip.distractedCount),
			// 							'distractedCount',
			// 						)}
			// 					</td>

			// 					<td className="text-4xl">
			// 						{result(
			// 							trips.map(trip => trip.hardBrakingCount),
			// 							'hardBrakingCount',
			// 						)}
			// 					</td>

			// 					<td className="text-4xl">
			// 						{result(
			// 							trips.map(trip => trip.speedingCount),
			// 							'speedingCount',
			// 						)}
			// 					</td>

			// 					<td className="text-4xl">
			// 						{result(
			// 							trips.map(trip => trip.rapidAccelerationCount),
			// 							'rapidAccelerationCount',
			// 						)}
			// 					</td>

			// 					<td className="text-4xl">
			// 						{result(
			// 							trips.map(trip => trip.crashCount),
			// 							'crashCount',
			// 						)}
			// 					</td>

			// 					<td className="text-4xl">
			// 						{Math.floor(average(trips.map(trip => trip.duration)) / 60)}
			// 						<span className="text-gray-500">/</span>
			// 						{Math.floor(highest(trips.map(trip => trip.duration)) / 60)}
			// 					</td>
			// 				</tr>
			// 			</tbody>
			// 		</table>
			// 	</div>
			// </div>
		),
	};
});
