import {useUser} from '../../client/hooks/users/@me';
import Image from 'next/image';
import {useMyCircles} from '../../client/hooks/account/circles';
import {MdPeopleAlt} from 'react-icons/md';
import Link from 'next/link';
import defaultAvatar from '../../client/assets/default-avatar.png';
import {CgCommunity} from 'react-icons/cg';
import {useToggle} from 'alistair/dist/hooks';
import {BotModal} from '../../client/modals/bot';

export default function DashboardPage() {
	const {data: user} = useUser();
	const {data: circles} = useMyCircles();
	const [botOpen, {on, off}] = useToggle();

	return (
		<main className="mx-auto max-w-3xl md:py-24 px-4 py-8 space-y-6">
			<BotModal isOpen={botOpen} close={off} options={{}} />

			<form
				action="/api/account/login"
				method="POST"
				className="rounded-xl bg-white dark:bg-gray-800 p-12 space-y-6 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700"
			>
				<div className="flex items-center space-x-3">
					{user && (
						<Image
							className="rounded-full object-cover"
							src={user.avatar ?? defaultAvatar}
							height={48}
							width={48}
							alt="Life 360 Logo"
						/>
					)}

					<h1 className="font-medium text-2xl flex-1">
						Welcome to Stats360, {user?.firstName}
					</h1>

					<button type="button" className="ml-auto" onClick={on}>
						<a className="w-auto bg-white dark:bg-gray-800 hover:bg-pink-500/5 hover:text-pink-500 hover:border-pink-500/25 dark:hover:bg-pink-900/10 transition-all duration-150 group inline-block justify-between border p-4 rounded-lg dark:bg-gray-900/50 dark:border-gray-700">
							<CgCommunity />
						</a>
					</button>
				</div>
				<h2 className="font-light text-lg text-gray-500">
					Select a circle below
				</h2>

				<div className="grid grid-cols-1 auto-cols-max md:grid-cols-2 gap-3">
					{circles ? (
						circles.length > 0 ? (
							circles.map(circle => (
								<Link key={circle.id} href={`/dashboard/${circle.id}`}>
									<a className="hover:bg-pink-500/5 hover:text-pink-500 hover:border-pink-500/25 dark:hover:bg-pink-900/10 transition-all duration-150 group w-full flex justify-between border px-3 py-3 rounded-lg dark:bg-gray-900/50 dark:border-gray-800">
										<p>{circle.name}</p>

										<p className="text-gray-600 dark:text-gray-400 group-hover:text-pink-400">
											<MdPeopleAlt className="inline -mt-1" />
											&nbsp;
											<span>{circle.memberCount}</span>
										</p>
									</a>
								</Link>
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
