// import App from 'next/app';
import '../styles/global.scss';
import AppShell from '../components/app-shell';

function MyApp({ Component, pageProps }) {
	return <AppShell>
		<Component {...pageProps} />
	</AppShell>
}
  
// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
