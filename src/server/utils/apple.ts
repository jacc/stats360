import {randomBytes} from 'crypto';
import {Utility} from './utility';

export class AppleUtils extends Utility {
	/**
	 * Generated a valid Apple phone UDID
	 * More documentation: https://www.theiphonewiki.com/wiki/UDID
	 * @param ecidWidth The width of the ECID in bits.
	 * @param chip The chip. List of chips: https://www.theiphonewiki.com/wiki/CHIP
	 * @returns The generated UDID.
	 * @example
	 * ```ts
	 * const udid = AppleUtils.randomUDID();
	 * ```
	 */
	public static randomUDID(ecidWidth = 16, chip = '00008020') {
		const bytes = randomBytes(ecidWidth / 2).toString('hex');
		return `${chip}-${bytes}`;
	}
}
