import {z} from 'zod';

export interface Encoder<T> {
	decode(value: string): T;
	encode(value: T): string;
}

export function assertIsBrowser(
	w = window,
): asserts w is Window & typeof globalThis {
	if (typeof w === 'undefined') {
		throw new Error('Cannot use this function in a non-browser environment');
	}
}

export function useJSONLocalStorage<T>(key: string, schema: z.Schema<T>) {
	return useLocalStorage<T>(key, {
		encode: value => JSON.stringify(value),
		decode: object => schema.parse(JSON.parse(object)),
	});
}

export function useLocalStorage<T>(key: string, encoding: Encoder<T>) {
	return {
		get() {
			assertIsBrowser();
			const value = localStorage.getItem(key);
			return value ? encoding.decode(value) : undefined;
		},
		set(value: T) {
			assertIsBrowser();
			localStorage.setItem(key, encoding.encode(value));
		},
	};
}
