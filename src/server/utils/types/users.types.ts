export interface Credentials {
	username: string;
	password: string;
}

export interface Life360User {
	features: Life360UserFeatures;
	issues: Life360UserIssues;
	location: Life360UserLocation;
	communications?: Life360UserCommunicationsEntity[] | null;
	medical: string;
	relation: string;
	createdAt: string;
	activity: string;
	id: string;
	firstName: string;
	lastName: string;
	isAdmin: string;
	avatar: string | null;
	pinNumber: string;
	loginEmail: string;
	loginPhone: string;
}

export interface Life360UserFeatures {
	device: string;
	smartphone: string;
	nonSmartphoneLocating: string;
	geofencing: string;
	shareLocation: string;
	shareOffTimestamp: string;
	disconnected: string;
	pendingInvite: string;
	mapDisplay: string;
}

export interface Life360UserIssues {
	disconnected: string;
	type: string;
	status: string;
	title: string;
	dialog: string;
	action: string;
	troubleshooting: string;
}

export interface Life360UserLocation {
	latitude: string;
	longitude: string;
	accuracy: string;
	startTimestamp: number;
	endTimestamp: string;
	since: number;
	timestamp: string;
	name: string;
	placeType: string;
	source: string;
	sourceId: string;
	address1: string;
	address2: string;
	shortAddress: string;
	inTransit: string;
	tripId: string;
	driveSDKStatus: string;
	battery: string;
	charge: string;
	wifiState: string;
	speed: number;
	isDriving: string;
	userActivity: string;
}

export interface Life360UserCommunicationsEntity {
	channel: string;
	value: string;
	type: string;
}

export interface Life360SelfUser {
	id: string;
	firstName: string;
	lastName: string;
	loginEmail: string;
	loginPhone: string;
	avatar: string | null;
	locale: string;
	language: string;
	created: string;
	avatarAuthor: any;
	settings: Life360SelfUserSettings;
	communications: Life360SelfUserCommunication[];
	cobranding: any[];
}

export interface Life360SelfUserSettings {
	map: Life360SelfUserMap;
	alerts: Life360SelfUserAlerts;
	zendrive: any;
	locale: string;
	unitOfMeasure: string;
	dateFormat: string;
	timeZone: string;
}

export interface Life360SelfUserMap {
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

export interface Life360SelfUserAlerts {
	crime: string;
	sound: string;
}

export interface Life360SelfUserCommunication {
	channel: string;
	value: string;
	type?: string;
}
