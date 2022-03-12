export default function Home() {
	return (
		<main className="mx-auto max-w-3xl py-24 space-y-6">
			<div className="rounded-lg bg-white p-6 shadow-sm shadow-cream-800/25 dark:shadow-neutral-800/25 font-light border border-gray-300 border-1">
				<div className="font-bold text-2xl text-black">Welcome to Stats360</div>
				<div className="font-light text-lg text-neutral-700">
					Stats360 is a website to view Life360 Circle statistics. Please login
					below.
				</div>

				<div>
					<input defaultValue="Login" />
				</div>
			</div>
		</main>
	);
}
