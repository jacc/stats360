export interface Life360Circle {
	id: string;
	name: string;
	color: string;
	type: string;
	createdAt: string;
	memberCount: string;
	unreadMessages: string;
	unreadNotifications: string;
	features: Life360CircleFeatures;
	members: Life360CircleMember[];
}

export interface Life360CircleFeatures {
	ownerId: any;
	skuId: any;
	premium: string;
	locationUpdatesLeft: number;
	priceMonth: string;
	priceYear: string;
	skuTier: any;
}

export interface Life360CircleMember {
	features: any[];
	issues: {
		action: '1' | '0' | null;
		dialog: '1' | '0' | null;
		disconnected: '1' | '0' | null;
		status: '1' | '0' | null;
		title: '1' | '0' | null;
		troubleshooting: '1' | '0' | null;
		type: 'lp_w' | null;
	};
	location?: any[];
	communications: any[];
	medical: any;
	relation: any;
	createdAt: string;
	activity: any;
	id: string;
	firstName: string;
	lastName: string;
	isAdmin: string;
	avatar?: string;
	pinNumber: any;
	loginEmail: string;
	loginPhone: string;
}
