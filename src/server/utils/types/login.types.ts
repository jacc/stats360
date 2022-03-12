export interface Life360LoginResponse {
	access_token: string;
	token_type: string;
	onboarding: number;
	user: User;
	cobranding: any[];
	promotions: any[];
	state: any;
}

export interface Life360LoginUser {
	id: string;
	firstName: string;
	lastName: string;
	loginEmail: string;
	loginPhone: string;
	avatar: string;
	locale: string;
	language: string;
	created: string;
	avatarAuthor: any;
	settings: Settings;
	communications: Communication[];
	cobranding: any[];
}

export interface Life360LoginSettings {
	map: Map;
	alerts: Alerts;
	zendrive: any;
	locale: string;
	unitOfMeasure: string;
	dateFormat: string;
	timeZone: string;
}

export interface Life360LoginMap {
	police: string;
	fire: string;
	hospital: string;
	sexOffenders: string;
	crime: string;
	crimeDuration: string;
	family: string;
	advisor: string;
	placeRadius: string;
	memberRadius: string;
}

export interface Life360LoginAlerts {
	crime: string;
	sound: string;
}

export interface Life360LoginCommunication {
	channel: string;
	value: string;
	type?: string;
}