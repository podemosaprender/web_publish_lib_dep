//INFO: the app for everythin IN THIS FOLDER
import '../styles/global.css'; //A: tailwind/NexUI styles
import { Providers } from '../lib/providers';

function MyApp({ Component, pageProps }) {
	return (
		<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }} >
			<Component {...pageProps} />
		</Providers>
	)
}

export default MyApp;
