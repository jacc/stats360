import {useEffect, useState} from 'react';

export function useLastValue<T>(value: T | null) {
	const [state, setState] = useState(value);

	useEffect(() => {
		setState(old => {
			if (value === null || old === value) {
				return old;
			}

			return value;
		});
	}, [value]);

	return state;
}
