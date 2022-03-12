import {useUser} from '../client/hooks/account/@me';

export default function DashboardPage() {
	const {data: user} = useUser();

	return (
		<div>
			<h1>Welcome back, {user?.firstName}</h1>
		</div>
	);
}
