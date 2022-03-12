import {useUser} from '../client/hooks/account/@me';
import Image from 'next/image';
import {useMyCircles} from '../client/hooks/account/circles';

export default function DashboardPage() {
	const {data: user} = useUser();
	const {data: circles} = useMyCircles();

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

				<div className="grid grid-cols-1 auto-cols-max md:grid-cols-2 gap-3">
					{circles ? (
						circles.length > 0 ? (
							circles.map(circle => (
								<p
									key={circle.id}
									className="w-full inline-block border px-3 py-3 rounded-lg dark:bg-gray-900/50 dark:border-gray-800"
								>
									{circle.name}
								</p>
							))
						) : (
							<p>No circles!</p>
						)
					) : (
						<p>Loading...</p>
					)}
				</div>
			</form>
		</main>
	);
}
