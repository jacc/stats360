import {createModal} from './create';
import {SiTwitter} from 'react-icons/si';
import {FaDiscord} from 'react-icons/fa';

export const ContactModal = createModal(() => ({
	title: 'Contact Us',
	content: (
		<div className="space-y-2 pt-2">
			<p>You can get in touch with us via Twitter, or our Discord!</p>

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
				<a
					href="https://discord.gg/Nt67yFFFQF"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block bg-purple-500/25 text-purple-500 px-3 py-1.5 rounded-full"
				>
					<FaDiscord className="inline-block" />
					&nbsp; Discord
				</a>
			</div>
		</div>
	),
}));
