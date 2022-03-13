import useSWR from 'swr';
import {InferAPIResponse} from 'nextkit';
import {NextkitClientError} from 'nextkit/client';

export type URLGetter<Args extends unknown[]> = (
	...args: Args
) => `/api/${string}` | null;

export function endpoint<T>() {
	return <Args extends unknown[]>(url: URLGetter<Args>) =>
		(...args: Args) =>
			useSWR<InferAPIResponse<T, 'GET'>, NextkitClientError>(url(...args));
}
