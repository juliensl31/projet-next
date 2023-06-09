// Librairies
import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Erreur 404 | Page introuvable</title>
      </Head>
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '5rem',
            marginTop: '200px',
            marginBottom: '10px',
            color: '#ee6c4d',
          }}
        >
          404
        </h1>
        <p style={{ fontSize: '1.5rem' }}>
          Cette page n'existe pas!!!
        </p>
      </div>
    </>
  );
}
