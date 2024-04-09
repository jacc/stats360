import {createModal} from './create';

export const LeftModel = createModal(() => ({
	title: "Who hasn't left?",
	content: (
		<div className="space-y-2 pt-2">
			<p className="font-light text-base text-gray-500">
				Members of your circle that haven't left their location in the last 3
				hours are listed here.
			</p>
		</div>
	),
}));
