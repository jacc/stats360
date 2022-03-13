import React, {useEffect} from 'react';
import {AppProps} from 'next/app';
import {SWRConfig} from 'swr';
import {fetcher} from '../client/fetcher';
import {AnimatePresence, motion} from 'framer-motion';
import Script from 'next/script';
import Link from 'next/link';
import {useThrottle, useToggle} from 'alistair/hooks';
import {ContactModal} from '../client/modals/contact';
import {useUser} from '../client/hooks/users/@me';
import colors from 'tailwindcss/colors';

import '@fontsource/plus-jakarta-sans';
import 'tailwindcss/tailwind.css';
import '../styles/index.css';
import {HashLoader} from 'react-spinners';
import {Head} from 'next/document';

function App({Component, pageProps, router}: AppProps) {
	const [contactOpen, {on, off}] = useToggle();
	const {data: user, error} = useUser();

	const throttledLoading = useThrottle(!user && !error, 300);

	useEffect(() => {
		const isDashboardPage = router.pathname.startsWith('/dashboard');

		if (user && !error && router.pathname === '/') {
			void router.replace('/dashboard');
			return;
		}

		if (error && error.code === 401 && isDashboardPage) {
			void router.push('/');
		}
	}, [error, user, router]);

	return (
		<>
			<Head>
				<title>Stats360 - Life360 Insights</title>
				<meta property="og:title" content="Stats360" />
				<meta
					property="og:description"
					content="Stats360 - Insights to your Life360 circles."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://phiilu.com/" />
				<meta
					property="og:image"
					content="https://stats360.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstats360.4b04b917.png&w=96&q=75"
				/>
			</Head>
			<ContactModal isOpen={contactOpen} close={off} options={{}} />

			<AnimatePresence exitBeforeEnter>
				{throttledLoading ? (
					<motion.div key="loader" initial={{opacity: 1}} exit={{opacity: 0}}>
						<main className="mx-auto max-w-3xl py-24 space-y-6">
							<div className="rounded-xl flex justify-center bg-white dark:bg-gray-800 p-4 md:p-12 space-y-6 shadow-sm dark:shadow-neutral-800/25 font-light border border-gray-300 dark:border-gray-700">
								<HashLoader color={colors.pink[500]} />
							</div>
						</main>
					</motion.div>
				) : (
					<motion.div
						key={router.pathname}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
					>
						<Component {...pageProps} />
					</motion.div>
				)}
			</AnimatePresence>

			<footer className="text-gray-400 text-center">
				<div>
					made with <span className="text-pink-500">♥</span> by{' '}
					<a
						className="text-pink-500 hover:underline underline-offset-2"
						href="https://twitter.com/laf0nd"
					>
						jack
					</a>{' '}
					and{' '}
					<a
						className="text-pink-500 hover:underline underline-offset-2"
						href="https://twitter.com/alistaiiiir"
					>
						alistair
					</a>
				</div>

				<div className="font-mono text-sm pb-24">
					<Link href="/data">
						<a className="text-sm text-pink-500 hover:underline underline-offset-2">
							data
						</a>
					</Link>
					&nbsp;
					<span>—</span>
					&nbsp;
					<button
						type="button"
						className="text-sm text-pink-500 hover:underline underline-offset-2"
						onClick={on}
					>
						contact
					</button>
				</div>
			</footer>

			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env
					.NEXT_PUBLIC_GOOGLE_ANALYTICS!}`}
				strategy="afterInteractive"
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){window.dataLayer.push(arguments);}
					gtag('js', new Date());

					gtag('config', \`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!}\`); 
				`}
			</Script>
		</>
	);
}

export default function Providers(props: AppProps) {
	return (
		<SWRConfig
			value={{
				fetcher,
				refreshInterval: 1000 * 10,
				dedupingInterval: 1000 * 10,
				errorRetryInterval: 1000 * 10,
				focusThrottleInterval: 1000 * 10,
			}}
		>
			<App {...props} />
		</SWRConfig>
	);
}
