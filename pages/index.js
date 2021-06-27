import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/published-elsewhere');
  });

	return <>
		<h2 className="title">
			Coming soon!
			<br/>
			<small>
				<a href="/published-elsewhere">View previous articles.</a>
			</small>
		</h2>
	</>
};
