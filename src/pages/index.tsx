import Image from 'next/image';
import Link from 'next/link';
import Life360Logo from '../client/assets/life360-logo.png';

export default function Home() {
	return (
		<main className="mx-auto max-w-3xl py-24 space-y-6">
			<form className="rounded-xl bg-white dark:bg-gray-800 p-12 space-y-6 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
				<div className="flex items-center space-x-3">
					<Image src={Life360Logo} height={48} width={48} alt="Life 360 Logo" />
					<h1 className=" font-medium text-2xl">Welcome to Stats360</h1>
				</div>

				<h2 className="font-light text-lg text-gray-500">
					Stats360 allows you to view data about your Life360 circles. To get
					started, login with your Life360 below.
				</h2>

				<div className="w-1/2 space-y-2">
					<input
						type="text"
						className="w-full inline-block border px-3 py-3 rounded-lg dark:bg-gray-900/50 dark:border-gray-800"
						placeholder="Life360 account email"
					/>

					<input
						type="password"
						className="w-full inline-block border px-3 py-3 rounded-lg dark:bg-gray-900/50 dark:border-gray-800"
						placeholder="Life360 account password"
					/>
				</div>

				<div>
					<button
						className="px-7 py-1.5 rounded-full bg-pink-500/25 text-pink-600 dark:text-pink-500"
						type="submit"
					>
						Login
					</button>
				</div>

				<div>
					<Link href="/why">
						<a className="text-xs inline-block text-pink-500 dark:text-gray-500">
							Why and how do we use your Life360 login?
						</a>
					</Link>
				</div>
			</form>
		</main>
	);
}
