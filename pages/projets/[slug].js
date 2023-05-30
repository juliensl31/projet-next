// Librairies
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Projet() {
  // variables
  const router = useRouter();

  // Méthodes
  //   const titleClickedHandler = () => {
  // router.replace('/'); //bloque le retour en arrière
  // router.push('/'); //permet le retour en arrière
  //   };

  return (
    <>
      <h1 style={{ marginBottom: '.5rem' }}>
        {router.query.slug}
      </h1>
      <small>
        <Link
          style={{
            color: '#EE6C4D',
            textDecoration: 'none',
          }}
          href='/perso'
        >
          Projet personnel
        </Link>
      </small>
    </>
  );
}
