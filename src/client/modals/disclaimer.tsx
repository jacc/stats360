import {createModal} from './create';
import {CgClose} from 'react-icons/cg';

export const DisclaimerModal = createModal(props => ({
	title: 'Disclaimer',
	content: (
		<div className="mt-4 space-y-4">
			<p>
				Stats360 was developed with priority for our users and their safety in
				mind. It should not be used as a tool to drive in a dangerous manner. By
				using Stats360, you agree to drive in a responsible manner and do not
				hold the developers of Stats360 responsible for any damage or injury
				that may occur as a result of your driving.
			</p>

			<button
				className="inline-flex items-center space-x-2 bg-pink-500/25 text-pink-500 px-8 py-1.5 rounded-full"
				type="button"
				onClick={props.close}
			>
				<span>I agree, continue to site</span>{' '}
				<CgClose className="inline-block mt-0.5" />
			</button>
		</div>
	),
}));
