import {Dialog, Transition} from '@headlessui/react';
import {useToggle} from 'alistair/hooks';
import React, {Fragment, ReactNode} from 'react';
import {BiX} from 'react-icons/bi';
import {useLastValue} from '../hooks/last-value';

export function useModal<Y>(options: Y | null) {
	const [isOpen, {on, off}] = useToggle();

	const stableOptions = useLastValue(options);

	let props: Props<Y>;

	if (isOpen) {
		if (!stableOptions) {
			throw new Error('Modal options must be set when opened!');
		}

		props = {
			isOpen,
			options: stableOptions,
			close: off,
		};
	} else {
		props = {
			isOpen: false,
			options: stableOptions,
			close: off,
		};
	}

	return {
		props,
		open: on,
		close: off,
	};
}

export type Props<Y> =
	| {isOpen: true; options: Y; close: () => unknown}
	| {isOpen: false; options?: Partial<Y> | null; close: () => unknown};

export type OpenProps<Y> = Extract<Props<Y>, {isOpen: true}>;

export function createModal<Y>(
	callback: (callback: OpenProps<Y>) => {
		content: ReactNode;
		title: ReactNode;
	},
) {
	// Required because we need a .displayName for the Component
	// eslint-disable-next-line func-names
	return function Modal(props: Props<Y>) {
		const {isOpen, close: closeModal} = props;

		const {content, title} = props.isOpen
			? callback(props)
			: {title: null, content: null};

		return (
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-50 overflow-y-auto"
					onClose={closeModal}
				>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>

						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-900 shadow-xl rounded-2xl">
								<div className="flex items-center justify-between">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 dark:text-gray-50"
									>
										{title}
									</Dialog.Title>

									<button
										type="button"
										className="focus:outline-none focus:ring rounded-sm opacity-50 hover:opacity-100 focus:opacity-100"
										onClick={closeModal}
									>
										<BiX className="h-5 w-5" />
									</button>
								</div>

								{content}
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		);
	};
}
