import {createModal} from './create';
import {SiTwitter} from 'react-icons/si';
import {FaDiscord} from 'react-icons/fa';

export const BotModal = createModal(() => ({
	title: 'Discord Integration',
	content: (
		<div className="space-y-2 pt-2">
			<p>
				Stats360's Discord integration is coming soon, in the mean time you can
				join our Discord server for more updates on the project below!
			</p>
			<div className="space-x-2">
				<a
					href="https://discord.gg/Nt67yFFFQF"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block bg-purple-500/25 text-purple-500 px-3 py-1.5 rounded-full"
				>
					<FaDiscord className="inline-block" />
					&nbsp; Stats360 Discord server
				</a>
			</div>
		</div>
	),
}));
