import {randomBytes} from 'crypto';
import {Utility} from './utility';

export class AppleUtils extends Utility {
	public static randomUDID() {
		// 16 / 2 = 8 bits (16 chars in hex)
		const ECID_WIDTH = 16;

		// https://www.theiphonewiki.com/wiki/CHIP
		const chip = '00008020';

		// https://www.theiphonewiki.com/wiki/UDID
		const bytes = randomBytes(ECID_WIDTH / 2).toString('hex');

		return `${chip}-${bytes}`;
	}
}
