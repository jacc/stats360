import React from 'react';
import {AppProps} from 'next/app';
import {SWRConfig} from 'swr';
import {fetcher} from '../client/fetcher';
import Head from 'next/head';
import {AnimatePresence, motion} from 'framer-motion';

import '@fontsource/plus-jakarta-sans';
import 'tailwindcss/tailwind.css';
import '../styles/index.css';

export default function App({Component, pageProps, router}: AppProps) {
	return (
		<SWRConfig value={{fetcher}}>
			<AnimatePresence exitBeforeEnter>
				<Head>
					<title>stats360 • Life360 Analytic Tool</title>
				</Head>

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
		</SWRConfig>
	);
}
