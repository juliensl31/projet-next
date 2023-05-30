// Librairies
import CarteDeProjet from '@/components/CarteDeProjet/CarteDeProjet';
import { useRouter } from 'next/router';

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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
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
