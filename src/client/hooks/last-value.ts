import {useEffect, useState} from 'react';

export function useLastValue<T>(value: T | null) {
	const [get, set] = useState(value);

	useEffect(() => {
		set(old => {
			if (value === null || old === value) {
				return old;
			}

			return value;
		});
	}, [value]);

	return get;
}
