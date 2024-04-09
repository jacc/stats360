import {createModal} from './create';

export const AlgoModel = createModal(() => ({
	title: 'Driver score calculation',
	content: (
		<div className="space-y-2 pt-2">
			<p className="font-light text-base text-gray-500">
				Stats360 has an in-house algorithm that calculates the driving score for
				each driver.
			</p>
			<h1>Weights</h1>
			<p className=" text-base text-gray-500">
				The score is weighted with the following variables:
			</p>
			<div className="text-base text-gray-500">
				<li>Number of times a driver hard breaked while driving</li>
				<li>Number of times a driver rapidly accelerated</li>
				<li>Number of times a driver speeds</li>
				<li>Number of times a driver gets in a crash</li>
				<li>Number of times a driver is distracted</li>
			</div>
		</div>
	),
}));
