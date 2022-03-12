import {Utility} from './utility';

export class Life360Utils extends Utility {
	public static async login(username: string, password: string) {
		const request = await fetch(
			'https://api-cloudfront.life360.com/v3/oauth2/token',
			{
				method: 'POST',
				headers: {
					'Authorization':
						'Basic YnJ1czR0ZXZhcHV0UmVadWNydUJSVXdVYnJFTUVDN1VYZTJlUEhhYjpSdUt1cHJBQ3JhbWVzV1UydVRyZVF1bXVtYTdhemFtQQ==',
					'User-Agent':
						'SafetyMapKoko/22.2.0.487/CBC47A39-34C3-43F2-9924-E7F1F928AC1C',
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				body: JSON.stringify({
					grant_type: 'password',
					username,
					password,
				}),
			},
		);

		return await request.json();
	}
}
