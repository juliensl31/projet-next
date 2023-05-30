// component
import CarteDeProjet from '@/components/CarteDeProjet/CarteDeProjet';

export default function Projet() {
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
        <CarteDeProjet />
        <CarteDeProjet />
        <CarteDeProjet />
        <CarteDeProjet />
      </div>
    </>
  );
}
