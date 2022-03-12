import {useRouter} from 'next/router';
import {useCircle} from '../../../client/hooks/circles/[id]';

export default function CirclePage() {
	const router = useRouter();

	const {data: circle} = useCircle((router.query.circle as string) ?? null);

	return <pre>{JSON.stringify(circle, null, 2)}</pre>;
}
