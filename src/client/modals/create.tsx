import {Dialog, Transition} from '@headlessui/react';
import React, {Fragment, ReactNode} from 'react';
import {BiX} from 'react-icons/bi';

interface Props<Y> {
	isOpen: boolean;
	close: () => unknown;

	// Required because used in the callback
	// eslint-disable-next-line react/no-unused-prop-types
	options: Y;
}

export function createModal<Y>(
	callback: (callback: Props<Y>) => {
		content: ReactNode;
		title: ReactNode;
	},
) {
	// Required because we need a .displayName for the Component
	// eslint-disable-next-line func-names
	return function Modal(props: Props<Y>) {
		const {content, title} = callback(props);
		const {isOpen, close: closeModal} = props;

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
							<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-900 shadow-xl rounded-2xl">
								<div className="flex items-center justify-between">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-50"
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
