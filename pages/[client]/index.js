// Librairies
import { useRouter } from 'next/router';

// Composants
import CarteDeProjet from '@/components/CarteDeProjet/CarteDeProjet';
import FiltresDeClient from '@/components/FiltresDeClient/FiltresDeClient';
import { MongoClient } from 'mongodb';

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
      <h1>{nomDuClient}</h1>

      {/* Filtres */}
      <FiltresDeClient client={router.query.client} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          marginTop: '15px',
        }}
      >
        {props.projets.map((projet) => (
          <CarteDeProjet key={projet.id} projet={projet} />
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  // variable de connection
  let projets;
  let client;

  try {
    // connection à MongoDB
    client = await MongoClient.connect(
      'mongodb+srv://JSL_Code:Lucalexia5653*@cluster0.zqphdhc.mongodb.net/portfolio?retryWrites=true&w=majority'
    );

    // connection à la base de donnée
    const db = client.db();

    // récupération des données
    projets = await db
      .collection('projets')
      .find()
      .toArray();
  } catch (error) {
    projets = [];
  }

  return {
    props: {
      projets: JSON.parse(JSON.stringify(projets)),
    },
  };
}
