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
	hardBrakingCount: 5,
	rapidAccelerationCount: 3,
	speedingCount: 10,
	crashCount: 20,
	distractedCount: 3,
});

export type Weighting = keyof typeof weightings;

export function calculateScoreFor(key: keyof typeof weightings, value: number) {
	return invert(value * weightings[key]);
}

export function calculateTripScore(trip: Life360UserTrip) {
	const values = [
		invert(trip.hardBrakingCount * weightings.hardBrakingCount),
		invert(trip.speedingCount * weightings.speedingCount),
		invert(trip.crashCount * weightings.crashCount),
		invert(trip.rapidAccelerationCount * weightings.rapidAccelerationCount),
		invert(trip.distractedCount * weightings.distractedCount),
	] as const;

	return Math.ceil(
		values.reduce((acc, value) => acc + value, 0) / values.length,
	);
}
