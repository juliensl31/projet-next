// Librairies
import { useRouter } from 'next/router';
import { connectDatabase } from '@/helpers/mongodb';

// Composants
import CarteDeProjet from '@/components/CarteDeProjet/CarteDeProjet';
import FiltresDeClient from '@/components/FiltresDeClient/FiltresDeClient';

export default function ProjetDuClientFiltre(props) {
  // variables
  const router = useRouter();
  let nomDuClient = router.query.client;
  const annee = router.query.annee;

  if (nomDuClient === 'perso') {
    nomDuClient = `Projets personnels (${annee})`;
  } else {
    nomDuClient = `Projets de ${nomDuClient} (${annee})`;
  }

  return (
    <>
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
      return ['perso', projet.annee];
    } else {
      return [projet.client, projet.annee];
    }
  });

  arrayPaths = [...new Set(arrayPaths)]; //Filtre les doublons du tableau (facultatif)

  const dynamicPaths = arrayPaths.map((path) => ({
    params: { client: path[0], annee: path[1].toString() },
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
  let anneeParam = +params.annee; // + pour convertir en nombre

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
    projets = JSON.parse(JSON.stringify(projets)); // Convertit les données en JSON

    annees = projets.map((projet) => projet.annee); // Récupère les années des projets
    annees = [...new Set(annees)]; //Filtre les doublons du tableau (facultatif)

    projets = projets.filter((projet) => projet.annee === anneeParam); // Filtre les projets de l'année
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
