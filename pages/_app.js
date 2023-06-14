// Librairies
import '../styles/style.css';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

// Components
import Layout from '../components/ui/Layout/Layout';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Head>
          <title>Julien | Développeur web et web mobile</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
