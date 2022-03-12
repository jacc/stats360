import {useRouter} from 'next/router';
import {useCircle} from '../../../client/hooks/circles/[id]';

export default function CirclePage() {
	const router = useRouter();

	const {data: circle} = useCircle((router.query.circle as string) ?? null);

	console.log(circle);

	return (
		<main className="mx-auto max-w-3xl py-24 space-y-6">
			<div className="rounded-xl bg-white dark:bg-gray-800 p-12 space-y-6 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
				<div className="flex items-center space-x-3">
					<h1 className="font-medium text-2xl">
						{circle?.name}'s Life360 Stats
					</h1>
				</div>

				<div className="grid grid-cols-1 auto-cols-max md:grid-cols-2 gap-3">
					<div>
						<div>Members</div>
						<div className="rounded-xl bg-white dark:bg-gray-800 p-4 space-y-6 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
							<ul>
								{circle?.members
									.filter(member => member.issues.disconnected == 0)
									.map(member => {
										return <li>{member.firstName}</li>;
									})}
							</ul>
						</div>
					</div>
				</div>

				{/* <div className="grid grid-cols-1 auto-cols-max md:grid-cols-2 gap-3">
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
			</div> */}
			</div>
		</main>
	);

	// return <pre>{JSON.stringify(circle, null, 2)}</pre>;
}
