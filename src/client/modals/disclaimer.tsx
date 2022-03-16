import {createModal} from './create';
import {CgClose} from 'react-icons/cg';

export const DisclaimerModal = createModal(props => ({
	title: 'Disclaimer',
	content: (
		<div className="mt-4 space-y-4">
			<p>
				Stats360 was made to have fun with your friend and family and we
				encourage safe driving at all times. We cannot be held responsible for
				dangerous or reckless driving.
			</p>

			<button
				className="inline-flex items-center space-x-2 bg-pink-500/25 text-pink-500 px-8 py-1.5 rounded-full"
				type="button"
				onClick={props.close}
			>
				<span>Close</span> <CgClose className="inline-block mt-0.5" />
			</button>
		</div>
	),
}));
