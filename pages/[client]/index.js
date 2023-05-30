// Librairies
import { useRouter } from 'next/router';

// Composants
import CarteDeProjet from '@/components/CarteDeProjet/CarteDeProjet';
import FiltresDeClient from '@/components/FiltresDeClient/FiltresDeClient';

export default function ProjetDuClient() {
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
        <CarteDeProjet />
        <CarteDeProjet />
        <CarteDeProjet />
        <CarteDeProjet />
      </div>
    </>
  );
}
