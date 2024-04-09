/* eslint-disable jsx-a11y/alt-text */

import NextImage, {ImageLoader, ImageProps} from 'next/image';

const localLoader: ImageLoader = ({src}) => src;

export default function Image(props: Omit<ImageProps, 'loader'>) {
	if (process.env.NODE_ENV === 'development') {
		return <NextImage unoptimized loader={localLoader} {...props} />;
	}

	const placeholder =
		props.placeholder ??
		(typeof props.placeholder === 'object' ? 'blur' : undefined);

	return (
		<NextImage {...props} placeholder={placeholder} loader={localLoader} />
	);
}

export {Image};
