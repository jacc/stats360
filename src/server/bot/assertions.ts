export function nullish<T>(
	value: T,
	message: string,
): asserts value is Exclude<T, null | undefined> {
	if (value === null || value === undefined) {
		throw new AssertionFailedError(value, message);
	}
}

export class AssertionFailedError<T> extends Error {
	constructor(public readonly value: T, message: string) {
		super(message);
	}
}
