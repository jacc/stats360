import Image from 'next/image';
import Stats360 from '../client/assets/stats360.png';
import {BackButton} from '../components/back-button';

export default function Why() {
	return (
		<main className="mx-auto max-w-3xl py-24 space-y-6">
			<BackButton />
			<div className="rounded-xl bg-white dark:bg-gray-800 p-12 space-y-6 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
				<div className="flex items-center space-x-3">
					<Image src={Stats360} height={48} width={48} alt="Life 360 Logo" />
					<h1 className=" font-medium text-2xl">
						Why and how we use your data
					</h1>
				</div>

				<h2 className="font-light text-lg text-gray-500">
					Stats360 was developed to allow Life360 users to see information about
					their Life360 circles. Because of this, we need your account username
					and password to login and request information on your behalf. However,
					the login is not sent anywhere but Life360, and we do not store your
					email or password. All we store is a temporary access token given to
					us by Life360 that allows us to request data.
				</h2>
				<h2 className="font-light text-lg text-gray-500">
					Stats360 is fully open source, and developers are more than welcome to
					take a look through the source code to see what we do under the hood.
				</h2>
			</div>
		</main>
	);
}
