import type LoginAPI from './api/account/login';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {InferAPIResponse} from 'nextkit';
import Stats360 from '../client/assets/stats360.png';
import {fetcher} from '../client/fetcher';
import {useToggle} from 'alistair/hooks';
import {Button} from '../client/components/Button';
import {useState} from 'react';
import {ErrorModal} from '../client/modals/error';
import {useLastValue} from '../client/hooks/last-value';

export default function Home() {
	const router = useRouter();
	const [loading, {on, off}] = useToggle();
	const [error, set] = useState<Error | null>(null);

	return (
		<main className="mx-auto max-w-3xl py-24 space-y-6">
			<ErrorModal
				options={{error: useLastValue(error)!}}
				isOpen={Boolean(error)}
				close={() => {
					set(null);
				}}
			/>

			<form
				action="/api/account/login"
				method="POST"
				className="rounded-xl bg-white dark:bg-gray-800 p-12 space-y-6 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700"
				onSubmit={async e => {
					e.preventDefault();
					on();

					const form = e.target as HTMLFormElement;

					try {
						await fetcher<InferAPIResponse<typeof LoginAPI, 'POST'>>(
							'/api/account/login',
							{
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									email: form.email.value as string,
									password: form.password.value as string,
								}),
								method: 'POST',
							},
						);

						await router.replace('/dashboard');
					} finally {
						off();
					}
				}}
			>
				<div className="flex items-center space-x-3">
					<Image src={Stats360} height={48} width={48} alt="Life 360 Logo" />
					<h1 className=" font-medium text-2xl">Welcome to Stats360</h1>
				</div>

				<h2 className="font-light text-lg text-gray-500">
					Gain insights to your Life360 circles. Sign in to get started.
				</h2>

				<div className="md:w-1/2 space-y-2">
					<input
						required
						type="email"
						name="email"
						className="w-full inline-block border px-3 py-3 rounded-lg dark:bg-gray-900/50 dark:border-gray-800"
						placeholder="Life360 account email"
					/>

					<input
						required
						type="password"
						name="password"
						className="w-full inline-block border px-3 py-3 rounded-lg dark:bg-gray-900/50 dark:border-gray-800"
						placeholder="Life360 account password"
					/>
				</div>

				<div>
					<Button
						className="px-7 py-1.5 rounded-full bg-pink-500/25 text-pink-600 dark:text-pink-500"
						type="submit"
						loading={loading}
					>
						Login
					</Button>
				</div>

				<div>
					<Link href="/data">
						<a className="text-xs inline-block dark:hover:text-pink-500 text-pink-500 dark:text-gray-500">
							Why do we need this?
						</a>
					</Link>
				</div>
			</form>
		</main>
	);
}
