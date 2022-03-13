import React from 'react';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import {useRouter} from 'next/router';

export function BackButton() {
	const router = useRouter();

	return (
		<button
			type="button"
			onClick={e => {
				e.preventDefault();
				router.back();
			}}
		>
			<a className="w-auto bg-white dark:bg-gray-800 hover:bg-pink-500/5 hover:text-pink-500 hover:border-pink-500/25 dark:hover:bg-pink-900/10 transition-all duration-150 group inline-block justify-between border p-4 rounded-lg dark:bg-gray-900/50 dark:border-gray-700">
				<AiOutlineArrowLeft />
			</a>
		</button>
	);
}
