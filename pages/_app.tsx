import { AppWrapper } from '../contexts';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { AppProps } from 'next/app';
import '../styles/index.css';

const client = new ApolloClient({
	uri: 'http://localhost:3000/graphql',
	cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<AppWrapper>
				<Component {...pageProps} />
			</AppWrapper>
		</ApolloProvider>
	);
}

export default MyApp;
