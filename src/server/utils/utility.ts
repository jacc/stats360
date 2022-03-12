/**
 * Abstract class for defining/marking something as a utility class (static methods only)
 */
export abstract class Utility {
	constructor() {
		throw new Error(
			`${this.constructor.name} cannot be constructed. It is a utility class only`,
		);
	}

	/**
	 * Self
	 * @returns Self
	 */
	protected self() {
		return this;
	}
}
