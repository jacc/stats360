import React from 'react';
import Link from 'next/link';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import {useRouter} from 'next/router';

export function BackButton() {
	const router = useRouter();
	return (
		<div>
			<button type="button" onClick={() => router.back()}>
				<a className="p-4 transform inline-block bg-gray-100 text-black hover:text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 dark:hover:text-white rounded-md transition hover:scale-95 ease-in-out dark:bg-gray-800 dark:text-gray-300">
					<AiOutlineArrowLeft />
				</a>
			</button>
		</div>
	);
}
