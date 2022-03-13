import {createModal} from './create';
import {SiTwitter} from 'react-icons/si';

export const ContactModal = createModal(() => ({
	title: 'Contact Us',
	content: (
		<div className="space-y-2 pt-2">
			<p>You can get in touch with us via Twitter</p>

			<div className="space-x-2">
				<a
					href="https://twitter.com/alistaiiiir"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block bg-blue-500/25 text-blue-500 px-3 py-1.5 rounded-full"
				>
					<SiTwitter className="inline-block" />
					&nbsp; @alistaiiiir
				</a>

				<a
					href="https://twitter.com/laf0nd"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block bg-blue-500/25 text-blue-500 px-3 py-1.5 rounded-full"
				>
					<SiTwitter className="inline-block" />
					&nbsp; @laf0nd
				</a>
			</div>
		</div>
	),
}));
