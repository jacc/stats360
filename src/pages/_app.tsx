import React from 'react';
import {AppProps} from 'next/app';
import {SWRConfig} from 'swr';
import {fetcher} from '../client/fetcher';
import Head from 'next/head';
import {AnimatePresence, motion} from 'framer-motion';

import '@fontsource/plus-jakarta-sans';
import 'tailwindcss/tailwind.css';
import '../styles/index.css';
import Link from 'next/link';
import {useToggle} from 'alistair/hooks';
import {ContactModal} from '../client/modals/contact';

export default function App({Component, pageProps, router}: AppProps) {
	const [contactOpen, {on, off}] = useToggle();

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
			<Head>
				<title>stats360 • Life360 Analytic Tool</title>
			</Head>

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
		</SWRConfig>
	);
}
