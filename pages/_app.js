// Librairies
import '../styles/style.css';

// Components
import Layout from '../components/ui/Layout/Layout';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      {' '}
      <Component {...pageProps} />
    </Layout>
  );
}
