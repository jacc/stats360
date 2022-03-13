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

export default function App({Component, pageProps, router}: AppProps) {
	return (
		<SWRConfig value={{fetcher}}>
			<Head>
				<title>stats360 • Life360 Analytic Tool</title>
			</Head>

			<AnimatePresence exitBeforeEnter>
				<motion.div
					key={router.pathname}
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					exit={{opacity: 0}}
				>
					<div className="p-6">
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
					<Link href="/why">
						<a className="text-sm text-pink-500 hover:underline underline-offset-2">
							data
						</a>
					</Link>
					&nbsp;
					<span>—</span>
					&nbsp;
					<Link href="/why">
						<a className="text-sm text-pink-500 hover:underline underline-offset-2">
							contact
						</a>
					</Link>
				</div>
			</footer>
		</SWRConfig>
	);
}
