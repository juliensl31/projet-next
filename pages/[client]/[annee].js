// Librairies
import CarteDeProjet from '@/components/CarteDeProjet/CarteDeProjet';
import { useRouter } from 'next/router';

export default function ProjetDuClientFiltre() {
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
      </div>
    </>
  );
}
