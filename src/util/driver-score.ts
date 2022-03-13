import type {Life360UserTrip} from '../server/utils/types/trip.types';

export function invert(input: number) {
	const value = (1 / input) * 100;

	if (value === Infinity) {
		return 100;
	}

	return value;
}

type ScoreKeys = Extract<keyof Life360UserTrip, `${string}Count`>;

const create = <T extends Record<ScoreKeys, number>>(data: T) => data;

// Bad things should be weighted greater than unity (one), and good things less.
const weightings = create({
	hardBrakingCount: 1,
	rapidAccelerationCount: 1,
	speedingCount: 1,
	crashCount: 1,
	distractedCount: 1,
});

const TOTAL_WEIGHTS = Object.values(weightings).reduce((a, b) => a + b, 0);

export function calculateTripScore(trip: Life360UserTrip) {
	const values = [
		invert(trip.hardBrakingCount * weightings.hardBrakingCount),
		invert(trip.speedingCount * weightings.speedingCount),
		invert(trip.crashCount * weightings.crashCount),
		invert(trip.rapidAccelerationCount * weightings.rapidAccelerationCount),
		invert(trip.distractedCount * weightings.distractedCount),
	] as const;

	return Math.ceil(
		values.reduce((acc, value) => acc + value, 0) / TOTAL_WEIGHTS,
	);
}
