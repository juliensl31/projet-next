// Librairies
import '../styles/style.css';
import Head from 'next/head';

// Components
import Layout from '../components/ui/Layout/Layout';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Julien | Développeur web et web mobile</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
