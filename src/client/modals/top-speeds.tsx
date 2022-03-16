import {createModal} from './create';

export const SpeedsModel = createModal(() => ({
	title: 'Recent top speeds',
	content: (
		<div className="space-y-2 pt-2">
			<p className="font-light text-base text-gray-500">
				Recent drives are calculated from the last 48 hours. The drive with the
				highest speed is then taken as the top speed for the driver.
			</p>
		</div>
	),
}));
