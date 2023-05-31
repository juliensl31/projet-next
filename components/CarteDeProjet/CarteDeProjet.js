// Librairies
import Link from 'next/link';
import classes from './CarteDeProjet.module.css';
// import { useRouter } from 'next/router';

// Méthode 1 (avec Link)

export default function CarteDeProjet(props) {
  //variables
  const { titre, description, annee, slug, client } =
    props.projet;

  return (
    <Link
      //   href='/projets/Believemy' 1ere méthode

      //   href={{
      //     pathname: '/projets/[slug]',
      //     query: { slug: 'Believemy' },
      //   }} 2eme méthode

      href={`/projets/${slug}`} //3eme méthode
      className={classes.CarteDeProjet}
    >
      <h3>{titre}</h3>
      <p>{description}</p>
      <small>
        {annee} {client}
      </small>
    </Link>
  );
}

// Méthode 2 (avec useRouter)

// export default function CarteDeProjet() {
//variables
//   const router = useRouter();

//Méthodes
// const cardClickedHandler = () => {
// router.push('/projets/Believemy'); 1ere méthode
//   router.push({
//     pathname: '/projets/[slug]',
//     query: { slug: 'Believemy' },
//   }); //2eme méthode
// };

//   return (
//       <div
//         className={classes.CarteDeProjet}
//         onClick={cardClickedHandler}
//       >
//         <h3>Titre du projet</h3>
//         <p>Description du projet</p>
//       </div>
//   );
// }
