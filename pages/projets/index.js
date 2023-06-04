// component
import CarteDeProjet from '@/components/CarteDeProjet/CarteDeProjet';
import { connectDatabase } from '@/helpers/mongodb';

export default function Projet(props) {
  console.log(props.projets);
  return (
    <>
      <h1>Mes Projets</h1>
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
    </>
  );
}

export async function getStaticProps() {
  // variable de connection
  let projets;

  try {
    // connection à la base de données
    const client = await connectDatabase();
    const db = client.db();

    // récupération des données
    projets = await db
      .collection('projets')
      .find()
      .sort({ dateDePublication: -1 })
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
