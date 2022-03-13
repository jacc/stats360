import React from 'react';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import {useRouter} from 'next/router';

export function BackButton() {
	const router = useRouter();
	return (
		<div>
			<button
				type="button"
				onClick={() => {
					router.back();
				}}
			>
				<a className="hover:bg-pink-500/5 hover:text-pink-500 hover:border-pink-500/25 dark:hover:bg-pink-900/10 transition-all duration-150 group w-full flex justify-between border p-4 rounded-lg dark:bg-gray-900/50 dark:border-gray-800">
					<AiOutlineArrowLeft />
				</a>
			</button>
		</div>
	);
}
