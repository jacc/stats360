import Image from 'next/image';
import Life360Logo from '../client/assets/life360-logo.png';

export default function Home() {
	return (
		<main className="mx-auto max-w-3xl py-24 space-y-6">
			<div className="rounded-lg bg-white p-12 space-y-6 shadow-sm shadow-cream-800/25 dark:shadow-neutral-800/25 font-light border border-gray-300 border-1">
				<div className="flex items-center space-x-3">
					<Image src={Life360Logo} height={48} width={48} alt="Life 360 Logo" />

					<h1 className="font-bold text-2xl text-black">Welcome to Stats360</h1>
				</div>

				<h2 className="font-light text-lg text-neutral-500">
					Stats360 is a website to view Life360 Circle statistics. Please login
					below.
				</h2>

				<div>
					<input
						className="border px-3 py-1.5 rounded-sm border-gray-800"
						defaultValue="Login"
					/>
				</div>
			</div>
		</main>
	);
}
