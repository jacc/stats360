import {useUser} from '../client/hooks/account/@me';
import Image from 'next/image';

export default function DashboardPage() {
	const {data: user} = useUser();
	console.log(user);

	return (
		<main className="mx-auto max-w-3xl py-24 space-y-6">
			<form
				action="/api/account/login"
				method="POST"
				className="rounded-xl bg-white dark:bg-gray-800 p-12 space-y-6 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700"
			>
				<div className="flex items-center space-x-3">
					{user && (
						<Image
							className="rounded-full object-cover"
							src={user.avatar}
							height={48}
							width={48}
							alt="Life 360 Logo"
						/>
					)}

					<h1 className=" font-medium text-2xl">
						Welcome to Stats360, {user?.firstName}
					</h1>
				</div>

				<h2 className="font-light text-lg text-gray-500">
					Select a circle below
				</h2>

				<div className="md:w-1/2 space-y-2">
					<div className="w-full inline-block border px-3 py-3 rounded-lg dark:bg-gray-900/50 dark:border-gray-800">
						aaa
					</div>

					<div className="w-full inline-block border px-3 py-3 rounded-lg dark:bg-gray-900/50 dark:border-gray-800">
						aaa
					</div>
				</div>
			</form>
		</main>
	);
}
