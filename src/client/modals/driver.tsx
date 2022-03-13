import {createModal} from './create';

import type API from '../../pages/api/circles/[id]/driving';
import {InferAPIResponse} from 'nextkit';

type Option = InferAPIResponse<typeof API, 'GET'>[number]['trips'];

function average(arr: number[]) {
	return arr.reduce((a, b) => a + b, 0) / arr.length;
}

export const DriverModal = createModal<{trips: Option}>(props => {
	const {trips} = props.options;

	return {
		title: 'Driver',
		content: (
			<div className="flex flex-col space-y-2">
				<p>Stats are taken as an average from the past ~5 trips</p>

				<div className="overflow-x-auto overflow-y-hidden h-full">
					<table>
						<thead>
							<tr>
								<th className="w-full whitespace-nowrap pr-4">Distractions</th>
								<th className="w-full whitespace-nowrap pr-4">Hard Brakes</th>
								<th className="w-full whitespace-nowrap pr-4">Speeding</th>
								<th className="w-full whitespace-nowrap pr-4">
									Rapid Acceleration
								</th>
								<th className="w-full whitespace-nowrap pr-4">Crashes 💀</th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<td className="text-4xl">
									{average(trips.map(trip => trip.distractedCount))}
								</td>
								<td className="text-4xl">
									{average(trips.map(trip => trip.hardBrakingCount))}
								</td>
								<td className="text-4xl">
									{average(trips.map(trip => trip.speedingCount))}
								</td>
								<td className="text-4xl">
									{average(trips.map(trip => trip.rapidAccelerationCount))}
								</td>
								<td className="text-4xl">
									{average(trips.map(trip => trip.crashCount))}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		),
	};
});
