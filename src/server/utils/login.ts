export class Life360Utils {
	public static async from(username: string, password: string) {
		const request = await fetch(
			'https://api-cloudfront.life360.com/v3/oauth2/token',
			{
				method: 'POST',
				headers: Life360Utils.headers,
				body: JSON.stringify({
					grant_type: 'password',
					username,
					password,
				}),
			},
		);

		return request.json();
	}

	private static readonly headers = {
		'Authorization': `Basic ${Buffer.from(
			'brus4tevaputReZucruBRUwUbrEMEC7UXe2ePHab:RuKuprACramesWU2uTreQumuma7azamA',
		).toString('base64')}`,
		'User-Agent':
			'SafetyMapKoko/22.2.0.487/CBC47A39-34C3-43F2-9924-E7F1F928AC1C',
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	};
}
