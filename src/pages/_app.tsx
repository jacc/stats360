import React from 'react';
import {AppProps} from 'next/app';
import {SWRConfig} from 'swr';
import {fetcher} from '../client/fetcher';
import Head from 'next/head';

import '@fontsource/plus-jakarta-sans';
import 'tailwindcss/tailwind.css';
import '../styles/index.css';

export default function App({Component, pageProps}: AppProps) {
	return (
		<SWRConfig value={{fetcher}}>
			<Head>
				<title>stats360 • Life360 Analytic Tool</title>
			</Head>

			<div className="p-6">
				<Component {...pageProps} />
			</div>
		</SWRConfig>
	);
}
