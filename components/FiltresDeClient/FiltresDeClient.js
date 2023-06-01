/* eslint-disable react/jsx-key */
// Librairies
import Link from 'next/link';

export default function FiltresDeClient(props) {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Link
        href={`/${props.client}`}
        style={{
          backgroundColor: '#EE6C4D',
          padding: '5px 15px 5px 15px',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
        }}
      >
        Tout
      </Link>

      {props.annees.map((annee) => (
        <Link
          href={`/${props.client}/${annee}`}
          style={{
            backgroundColor: '#EE6C4D',
            padding: '5px 15px 5px 15px',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
          }}
        >
          {annee}
        </Link>
      ))}
    </div>
  );
}
