import React from 'react';
import {AppProps} from 'next/app';
import {SWRConfig} from 'swr';
import {fetcher} from '../client/fetcher';

import 'tailwindcss/tailwind.css';
import '../styles/index.css';
import '@fontsource/plus-jakarta-sans';

export default function App({Component, pageProps}: AppProps) {
	return (
		<SWRConfig value={{fetcher}}>
			<div className="p-6">
				<Component {...pageProps} />
			</div>
		</SWRConfig>
	);
}
