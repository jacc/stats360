import {createModal} from './create';

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
			{avg}
			<span className="text-gray-500">/</span>
			{highest(arr)}
			<span className="text-gray-500">/</span>
			{fix(calculateScoreFor(key, avg))}
		</>
	);
}

export const DriverModal = createModal<{trips: Option}>(props => {
	const {trips} = props.options;

	return {
		title: 'Driver score',
		content: (
			<div className="flex flex-col space-y-2">
				<p className="font-light text-base text-gray-500">
					Stats from most recent {trips.length} trips - coming soon!
				</p>
				{/* <p>
					Format is{' '}
					<code className="text-pink-500 bg-pink-500/25">
						&lt;avg&gt;/&lt;max&gt;/&lt;weight&gt;
					</code>{' '}
				</p>

				<div className="overflow-x-auto overflow-y-hidden h-full">
					<table
						style={{
							margin: '0 -20px',
							borderSpacing: '20px 0',
							borderCollapse: 'separate',
						}}
					>
						<thead>
							<tr>
								<th className="w-full whitespace-nowrap">Distractions</th>
								<th className="w-full whitespace-nowrap">Hard Brakes</th>
								<th className="w-full whitespace-nowrap">Speeding</th>
								<th className="w-full whitespace-nowrap">Rapid Acceleration</th>
								<th className="w-full whitespace-nowrap">Crashes 💀</th>
								<th className="w-full whitespace-nowrap">Duration (mins)</th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<td className="text-4xl">
									{result(
										trips.map(trip => trip.distractedCount),
										'distractedCount',
									)}
								</td>

								<td className="text-4xl">
									{result(
										trips.map(trip => trip.hardBrakingCount),
										'hardBrakingCount',
									)}
								</td>

								<td className="text-4xl">
									{result(
										trips.map(trip => trip.speedingCount),
										'speedingCount',
									)}
								</td>

								<td className="text-4xl">
									{result(
										trips.map(trip => trip.rapidAccelerationCount),
										'rapidAccelerationCount',
									)}
								</td>

								<td className="text-4xl">
									{result(
										trips.map(trip => trip.crashCount),
										'crashCount',
									)}
								</td>

								<td className="text-4xl">
									{Math.floor(average(trips.map(trip => trip.duration)) / 60)}
									<span className="text-gray-500">/</span>
									{Math.floor(highest(trips.map(trip => trip.duration)) / 60)}
								</td>
							</tr>
						</tbody>
					</table>
				</div> */}
			</div>
		),
	};
});
