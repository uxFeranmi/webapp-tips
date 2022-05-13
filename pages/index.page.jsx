import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/published-elsewhere');
  });

	// already handled by mdx-bundler: http://npmjs.com/package/gray-matter

	// code formatting in browser: prism-react-renderer
	// https://github.com/agneym/playground
	// https://adamcollier.co.uk/blog/adding-an-updated-date-to-markdown-and-mdx-posts/
	// https://github.com/kentcdodds/mdx-bundler

	// On server start, compare lastPublishedCommit hash in the database with latest commit
	// on the git repo. Publish any changes from commits after lastPublishedCommit.

	// https://www.npmjs.com/package/git-interface
	// const diffFileList = await git.getDiffByRevisionFileList('5e19a1d3c386a2607885627f3774d3d7746b60de');
	// const timeOfLastCommit = await git.getTimeOfLastCommit('branch-name');
	// const hashOfLastCommit = await git.getHashOfLastCommit('branch-name');

	// https://gabrielcsapo.github.io/node-git-server/

	// dev/start: cross-env NODE_OPTIONS='--require "./path/to/init.js"' next dev/start

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
