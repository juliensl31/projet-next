// Librairies
import Image from 'next/image';
import { connectDatabase } from '@/helpers/mongodb';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

// Composants
import CarteDeProjet from '@/components/CarteDeProjet/CarteDeProjet';

export default function Home(props) {
  return (
    <main>
      <Head>
        <title>Julien | Développeur web et web mobile</title>
      </Head>
      <h1>
        Bienvenue{' '}
        {props.utilisateur
          ? props.utilisateur.name
          : 'sur mon portfolio'}
      </h1>
      <div
        style={{
          border: '2px solid #ee6c4d',
          padding: '30px',
          borderRadius: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '30px',
        }}
      >
        <div>
          <h2 style={{ fontWeight: 'lighter' }}>
            Je m'appelle <b>Julien</b>
          </h2>
          <p>
            Je suis développeur web et web mobile full-stack. J'ai
            créé ce site pour partager mes projets et mes expériences.
            Envie de collaborer avec moi ?
          </p>
          <p>
            <a
              href='mailto:moi@gmail.com'
              style={{
                display: 'inline-block',
                background: '#ee6c4d',
                color: 'white',
                padding: '10px 15px 10px 15px',
                borderRadius: '5px',
                textDecoration: 'none',
              }}
            >
              contactez moi !
            </a>
          </p>
        </div>
        <div>
          <div
            style={{
              borderRadius: '50%',
              overflow: 'hidden',
              lineHeight: 0,
            }}
          >
            <Image
              src='/moi.jpg'
              width={150}
              height={150}
              alt='moi'
            />
          </div>
        </div>
      </div>

      <h2 style={{ marginTop: '45px', textTransform: 'capitalize' }}>
        Mes derniers projets
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
        }}
      >
        {props.projets.map((projet) => (
          // eslint-disable-next-line react/jsx-key
          <CarteDeProjet projet={projet} key={projet._id} />
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  // variable de connection
  let projets;
  const session = await getSession({ req: context.req });
  let utilisateur = null;

  if (session) {
    utilisateur = session.user;
    console.log(utilisateur);
  }

  try {
    // connection à la base de données
    const client = await connectDatabase();
    const db = client.db();

    // récupération des données
    projets = await db
      .collection('projets')
      .find()
      .sort({ dateDePublication: -1 })
      .limit(3)
      .toArray();
  } catch (error) {
    projets = [];
  }

  return {
    props: {
      projets: JSON.parse(JSON.stringify(projets)),
      utilisateur: utilisateur,
    },
  };
}
