import {forwardRef} from 'react';
import {AiOutlineLoading} from 'react-icons/ai';
import {cx} from 'class-variance-authority';

export type Props = JSX.IntrinsicElements['button'] & {loading?: boolean};

export const Button = forwardRef<HTMLButtonElement, Props>(
	({loading = false, ...props}, ref) => (
		<button
			ref={ref}
			type="button"
			{...props}
			className={`relative ${props.className ?? ''}`}
		>
			{loading && (
				<span className="absolute inset-0 flex items-center justify-center">
					<span className="animate animate-spin">
						<AiOutlineLoading />
					</span>
				</span>
			)}

			<span className={cx(loading ? 'opacity-0' : 'opacity-100')}>
				{props.children}
			</span>
		</button>
	),
);

Button.displayName = 'Button';
