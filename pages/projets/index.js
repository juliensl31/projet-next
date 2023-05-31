// Librairie
import { MongoClient } from 'mongodb';

// component
import CarteDeProjet from '@/components/CarteDeProjet/CarteDeProjet';

export default function Projet(props) {
  console.log(props.projets);
  return (
    <>
      <h1>Mes Projets</h1>;
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
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
