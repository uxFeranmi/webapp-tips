import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/app-shell.module.scss';

const AppShell = (props)=> {
	return <>
		<Head key={'Site-wide <head> content'}>
			<title>Web App Tips</title>
		</Head>

		<header key={'Titlebar'} className={styles['site-header']}>
			<h1 className={styles['page-title']}>
				<Link href="/">
					<a>Web App Tips</a>
				</Link>
			</h1>
		</header>

		<main key={'Main content'} className={styles['main-content']}>
			{props.children}
		</main>

		<footer key={'Site footer'} className={styles['site-footer']}>
			<address>
				{/* <p>
					Designed and developed
					by <a href="https://feranmi.dev" target="_blank" rel="noopener noreferrer">
						Feranmi Akinlade
					</a>.
				</p>
				<p>
					<small>
						All articles authored by Feranmi Akinlade.
					</small>
				</p> */}
				<p>
					All articles authored
					by <a href="https://feranmi.dev" target="_blank" rel="noopener noreferrer">
						Feranmi Akinlade
					</a>.
				</p>
			</address>
		</footer>
	</>
};

export default AppShell;
