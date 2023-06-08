// Librairies
import Head from 'next/head';
import { useState } from 'react';
import { SpinnerDotted } from 'spinners-react';

// Components
import Button from '@/components/ui/Button/Button';

export default function Connexion() {
  // States
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Julien | Connexion</title>
      </Head>
      <h1 style={{ textAlign: 'center', marginTop: '35px' }}>
        Connexion
      </h1>
      <section
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <main
          style={{
            background: '#f3f3f3',
            padding: '30px',
          }}
        >
          <form>
            <p>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                placeholder='E-mail'
                className='input'
              />
            </p>
            <p>
              <label htmlFor='password'>Mot de passe</label>
              <input
                type='password'
                placeholder='Mot de passe'
                className='input'
              />
            </p>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <Button>
                {loading ? (
                  <SpinnerDotted
                    size={20}
                    thickness={100}
                    speed={100}
                    color='#ffffff'
                  />
                ) : (
                  'Je me connecte'
                )}
              </Button>
            </div>
          </form>
        </main>
      </section>
    </>
  );
}
