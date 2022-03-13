import useSWR from 'swr';
import {InferAPIResponse} from 'nextkit';
import {NextkitClientError} from 'nextkit/client';

type ValidArguments = string | null;

export type URLGetter<Args extends ValidArguments[]> = (
	...args: Args
) => `/api/${string}` | null;

export function endpoint<T>() {
	return <Args extends ValidArguments[]>(url: URLGetter<Args>) =>
		(...args: Args) =>
			useSWR<InferAPIResponse<T, 'GET'>, NextkitClientError>(url(...args));
}
