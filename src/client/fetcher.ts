import {APIResponse} from 'nextkit';
import {NextkitClientError} from 'nextkit/client';

export async function fetcher<T>(url: string) {
	const request = await fetch(url);
	const body = (await request.json()) as APIResponse<T>;

	if (!body.success) {
		throw new NextkitClientError(request.status, body.message);
	}

	return body.data;
}
