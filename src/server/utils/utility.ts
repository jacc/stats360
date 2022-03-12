/**
 * Abstract class for defining/marking something as a utility class (static methods only)
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class Utility {
	protected constructor() {
		throw new Error(
			`${this.constructor.name} cannot be constructed. It is a utility class only`,
		);
	}
}
