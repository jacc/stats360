import {randomBytes} from 'crypto';
import {Utility} from './utility';

export class AppleUtils extends Utility {
	public static randomUDID() {
		// 16 / 2 = 8 bits (16 chars in hex)
		const ECID_WIDTH = 16;

		// Docs:
		// https://www.theiphonewiki.com/wiki/UDID
		// https://www.theiphonewiki.com/wiki/CHIP
		const bytes = randomBytes(ECID_WIDTH / 2).toString('hex');
		const chip = '00008020';

		return `${chip}-${bytes}`;
	}
}
