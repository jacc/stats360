import type {Life360UserTrip} from '../server/utils/types/trip.types';

const HOUR_IN_SECONDS = 60 * 60;

export function invert(input: number) {
	const value = (1 / input) * 100;

	if (value === Infinity) {
		return 100;
	}

	return value;
}

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

type ScoreKeys = Extract<keyof Life360UserTrip, `${string}Count`>;

const create = <T extends Record<ScoreKeys, number>>(data: T) => data;

// Bad things should be weighted greater than unity (one), and good things less.
const weightings = create({
	hardBrakingCount: 85,
	rapidAccelerationCount: 50,
	speedingCount: 20,
	crashCount: 100,
	distractedCount: 9,
	excessDuration: 2.5 / HOUR_IN_SECONDS,
});

export function calculateTripScore(trip: Life360UserTrip) {
	const braking = invert(trip.hardBrakingCount * weightings.hardBrakingCount);
	const speeding = invert(trip.speedingCount * weightings.speedingCount);
	const crashes = invert(trip.crashCount * weightings.crashCount);

	const accel = invert(
		trip.rapidAccelerationCount * weightings.rapidAccelerationCount,
	);

	const distractions = invert(
		trip.distractedCount * weightings.distractedCount,
	);

	const excessDuration = trip.duration - 2 * HOUR_IN_SECONDS;
	const clampedExcessDuration = excessDuration > 0 ? excessDuration : 0;

	const excessDurationWeighted = invert(
		clampedExcessDuration * weightings.excessDuration,
	);

	const values = [
		braking,
		speeding,
		crashes,
		accel,
		distractions,
		excessDurationWeighted,
	];

	console.log({values, user: trip.userId});

	return clamp(
		Math.ceil(values.reduce((acc, value) => acc + value, 0) / values.length),
		1,
		100,
	);
}
