import {AppleUtils} from './apple';
import {Life360Circle} from './types/circles.types';
import {Life360CircleLocation} from './types/location.types';
import {Life360LoginResponse} from './types/login.types';
import {Life360CirclePlace} from './types/places.types';
import {Life360Premium} from './types/premium.types';
import {Life360UserTrip} from './types/trip.types';
import {Credentials, Life360SelfUser, Life360User} from './types/users.types';
import urlcat from 'urlcat';

export class Life360API {
	public static async login(credentials: Credentials) {
		const udid = AppleUtils.randomUDID();

		const request = await fetch(
			'https://api-cloudfront.life360.com/v3/oauth2/token',
			{
				method: 'POST',
				headers: {
					...Life360API.getHeaders(udid),
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({grant_type: 'password', ...credentials}),
			},
		);

		const response = (await request.json()) as Life360LoginResponse;

		return new Life360API(response.access_token, udid);
	}

	private static getHeaders(udid: string) {
		const basicAuth = Buffer.from(
			'brus4tevaputReZucruBRUwUbrEMEC7UXe2ePHab:RuKuprACramesWU2uTreQumuma7azamA',
		).toString('base64');

		return {
			'Authorization': `Basic ${basicAuth}`,
			'User-Agent': `SafetyMapKoko/22.2.0.487/${udid}`,
			'Accept': 'application/json',
			'X-Device-Id': udid,
		};
	}

	private readonly udid;
	private readonly token;

	constructor(token: string, udid = AppleUtils.randomUDID()) {
		this.token = token;
		this.udid = udid;
	}

	getAccessToken() {
		return this.token;
	}

	/**
	 * Gets the current user logged in
	 * @returns The user's self data
	 */
	async getSelf() {
		return this.get<Life360SelfUser>('users');
	}

	/**
	 * Gets all circles
	 */
	async getCircles() {
		return this.get<Life360Circle[]>('circles');
	}

	/**
	 * Gets a circle
	 * @param circleId The ID of the circle
	 */
	async getCircle(circleId: string) {
		return this.get<Life360Circle>(`circles/${circleId}`);
	}

	/**
	 * Gets all places added in a circle
	 * @param circleId The ID of the circle
	 */
	async getCirclePlaces(circleId: string) {
		return this.get<Life360CirclePlace[]>(`circles/${circleId}/allplaces`);
	}

	/**
	 * Gets location history for all members in a circle
	 * @param circleId The ID of the circle
	 */
	async getCircleHistory(circleId: string) {
		return this.get<Life360CircleLocation[]>(
			`circles/${circleId}/members/history`,
		);
	}

	/**
	 * Get all users in a circle
	 * @param circleId The ID of the circle
	 */
	async getUsers(circleId: string) {
		return this.get<Life360User>(`circles/${circleId}/members`);
	}

	/**
	 * Gets a user in a circle
	 * @param circleId The ID of the circle
	 * @param userId The ID of the user
	 */
	async getUser(circleId: string, userId: string) {
		return this.get<Life360User>(`circles/${circleId}/members/${userId}`);
	}

	/**
	 * Gets recent trips made by a user of the circle
	 * @param circleId The ID of the circle
	 * @param userId The ID of the user
	 */
	async getUserTrips(circleId: string, userId: string) {
		return this.get<Life360UserTrip[]>(
			`circles/${circleId}/users/${userId}/driverbehavior/trips`,
		);
	}

	/**
	 * Gets a recent trip made by a user of the circle
	 * @param circleId The ID of the circle
	 * @param userId The ID of the user
	 * @param tripId The ID of the trip
	 */
	async getUserTrip(circleId: string, userId: string, tripId: string) {
		return this.get<Life360UserTrip>(
			`circles/${circleId}/users/${userId}/driverbehavior/trips/${tripId}`,
		);
	}

	async getPremiumStatus(circleId: string) {
		return this.get<Life360Premium>(`users/premium?circleId=${circleId}`);
	}

	/**
	 * Internal function to get data from the API
	 * @param path The path to query
	 */
	protected async get<T>(path: string, init?: RequestInit): Promise<T> {
		return fetch(urlcat('https://api-cloudfront.life360.com/v3', path), {
			...init,
			headers: {
				...Life360API.getHeaders(this.udid),
				...init?.headers,
				Authorization: `Bearer ${this.token}`,
			},
		}).then(async res => res.json() as Promise<T>);
	}
}
