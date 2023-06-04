/* eslint-disable react/jsx-key */
// Librairies
import { connectDatabase } from '@/helpers/mongodb';
import Link from 'next/link';

export default function Projet(props) {
  // variables
  const { titre, description, annee, slug, client } = props.projet;
  let clientAAfficher = client;

  if (client === 'Projet personnel') {
    clientAAfficher = 'perso';
  }

  // Méthodes
  //   const titleClickedHandler = () => {
  // router.replace('/'); //bloque le retour en arrière
  // router.push('/'); //permet le retour en arrière
  //   };

  return (
    <>
      <h1 style={{ marginBottom: '.5rem' }}>{titre}</h1>
      <small style={{ display: 'flex', gap: '15px' }}>
        <Link
          style={{
            color: '#EE6C4D',
            textDecoration: 'none',
          }}
          href={`/${clientAAfficher}`}
        >
          {client}
        </Link>
        <div>Projet réalisé en {annee}</div>
      </small>
    </>
  );
}

export async function getServerSideProps(context) {
  // variable
  let projetRecupere;
  const { params } = context;
  const slug = params.slug;

  try {
    //connection à mongodb
    const client = await connectDatabase();
    const db = client.db();

    // récupération des données
    projetRecupere = await db
      .collection('projets') //récupère la collection projets
      .find({ slug: slug }) //récupère le projet qui a le slug correspondant
      .toArray(); //transforme le résultat en tableau
  } catch (error) {
    projetRecupere = [];
  }

  if (!projetRecupere[0]) {
    return {
      // notFound: true, //permet de renvoyer une page 404
      redirect: {
        destination: '/', //redirige vers la page d'accueil
      },
    };
  }

  return {
    props: {
      projet: JSON.parse(JSON.stringify(projetRecupere))[0], //transforme le résultat en objet
    },
  };
}

// export async function getStaticPaths() {
//   //variables
//   let projets;

//   try {
//     // connection à mongodb
//     const client = await connectDatabase();
//     const db = client.db();

//     // récupération tous les projets
//     projets = await db.collection('projets').find().toArray();
//   } catch (error) {
//     projets = [];
//   }
//   const dynamicPaths = projets.map((projet) => ({
//     params: { slug: projet.slug },
//   }));

//   return {
//     paths: dynamicPaths,
//     fallback: 'blocking',
//   };
// }

// export async function getStaticProps(context) {
// // variable
// let projetRecupere;
// const { params } = context;
// const slug = params.slug;

// try {
//   //connection à mongodb
//   const client = await connectDatabase();
//   const db = client.db();

//   // récupération des données
//   projetRecupere = await db
//     .collection('projets') //récupère la collection projets
//     .find({ slug: slug }) //récupère le projet qui a le slug correspondant
//     .toArray(); //transforme le résultat en tableau
// } catch (error) {
//   projetRecupere = [];
// }

// if (!projetRecupere[0]) {
//   return {
//     // notFound: true, //permet de renvoyer une page 404
//     redirect: {
//       destination: '/', //redirige vers la page d'accueil
//     },
//   };
// }

// return {
//   props: {
//     projet: JSON.parse(JSON.stringify(projetRecupere))[0], //transforme le résultat en objet
//   },
//   revalidate: 3600, //permet de revalider la page toutes les heures
// };
// }
