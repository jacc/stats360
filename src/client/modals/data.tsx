import Link from 'next/link';
import {createModal} from './create';

export const DataModal = createModal(() => ({
	title: 'Why do we need your Life360 login?',
	content: (
		<div className="space-y-2 pt-2">
			<p className="font-light text-lg text-gray-500">
				Your account username and password is used to login and request
				information on your behalf. However, the login is not sent anywhere but
				Life360, and we do not store your email or password.
			</p>
			<p className="font-light text-lg text-gray-500">
				You can read more about our data usage{' '}
				<Link href="/data">
					<span className="text-pink-500 hover:underline underline-offset-2">
						here
					</span>
				</Link>
				.
			</p>
		</div>
	),
}));
