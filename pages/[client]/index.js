// Librairies
import { useRouter } from 'next/router';
import Head from 'next/head';

// Composants
import CarteDeProjet from '@/components/CarteDeProjet/CarteDeProjet';
import FiltresDeClient from '@/components/FiltresDeClient/FiltresDeClient';
import { connectDatabase } from '@/helpers/mongodb';

export default function ProjetDuClient(props) {
  // variables
  const router = useRouter();
  let nomDuClient = router.query.client;

  if (nomDuClient === 'perso') {
    nomDuClient = 'Projets personnels';
  } else {
    nomDuClient = `Projets de ${nomDuClient}`;
  }

  return (
    <>
      <Head>
        <title>{nomDuClient}</title>
      </Head>
      <h1>{nomDuClient}</h1>

      {/* Filtres */}
      <FiltresDeClient
        client={router.query.client}
        annees={props.annees}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          marginTop: '15px',
        }}
      >
        {props.projets.map((projet) => (
          // eslint-disable-next-line react/jsx-key
          <CarteDeProjet projet={projet} key={projet._id} />
        ))}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  // connection à la base de données
  const client = await connectDatabase();
  const db = client.db();

  // récupération des données
  const projets = await db.collection('projets').find().toArray();

  let arrayPaths = projets.map((projet) => {
    if (projet.client === 'Projet personnel') {
      return 'perso';
    } else {
      return projet.client;
    }
  });
  arrayPaths = [...new Set(arrayPaths)];
  const dynamicPaths = arrayPaths.map((path) => ({
    params: { client: path },
  }));

  return {
    paths: dynamicPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  // variable de connection
  let projets;
  let annees;
  const { params } = context;
  let clientParam = params.client;

  if (clientParam == 'perso') {
    clientParam = 'Projet personnel';
  }

  try {
    // connection à la base de données

    const client = await connectDatabase();
    const db = client.db();

    // récupération des données
    projets = await db
      .collection('projets')
      .find({ client: clientParam })
      .sort({ dateDePublication: 1 })
      .toArray();
    projets = JSON.parse(JSON.stringify(projets));

    annees = projets.map((projet) => projet.annee);
    annees = [...new Set(annees)];
  } catch (error) {
    projets = [];
  }

  return {
    props: {
      projets: projets,
      annees: annees,
    },
    revalidate: 3600,
  };
}
