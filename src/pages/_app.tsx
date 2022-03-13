import React, {useEffect} from 'react';
import {AppProps} from 'next/app';
import {SWRConfig} from 'swr';
import {fetcher} from '../client/fetcher';
import {AnimatePresence, motion} from 'framer-motion';
import Script from 'next/script';
import Link from 'next/link';
import {useToggle} from 'alistair/hooks';
import {ContactModal} from '../client/modals/contact';
import {useUser} from '../client/hooks/users/@me';

import '@fontsource/plus-jakarta-sans';
import 'tailwindcss/tailwind.css';
import '../styles/index.css';

export default function App({Component, pageProps, router}: AppProps) {
	const [contactOpen, {on, off}] = useToggle();
	const {error} = useUser();

	useEffect(() => {
		const isDashboardPage = router.pathname.startsWith('/dashboard');

		if (error && error.code === 401 && isDashboardPage) {
			void router.push('/');
		}
	}, [error, router]);

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
			<ContactModal isOpen={contactOpen} close={off} options={{}} />

			<AnimatePresence exitBeforeEnter>
				<motion.div
					key={router.pathname}
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					exit={{opacity: 0}}
				>
					<div className="p-1 md:p-6">
						<Component {...pageProps} />
					</div>
				</motion.div>
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
		</SWRConfig>
	);
}
