// Librairies
import Head from 'next/head';
import { useState } from 'react';
import { SpinnerDotted } from 'spinners-react';
import { useForm } from 'react-hook-form';
import { getSession } from 'next-auth/react';

// Components
import Button from '@/components/ui/Button/Button';
import Error from '@/components/ui/Error/Error';

export default function Inscription() {
  // Variable
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [isRegistered, setIsRegistered] = useState(false);

  // Methods
  const onFormSubmittedHandler = async (data) => {
    // Vérification du chargement
    if (!loading) {
      setLoading(true);
      setError(null);
      // Envoi des données sur notre API Next
      const response = await fetch('/api/inscription', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Récupération de la réponse de l'API
      const fetchedData = await response.json();

      // Vérification de la réponse
      if (!response.ok) {
        // Si erreur de la part de l'API Next
        setLoading(false);
        // Affichage de l'erreur
        setError(fetchedData.message || 'Une erreur est survenue !');
      } else {
        setLoading(false);
        setIsRegistered(fetchedData.utilisateur);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Julien | Inscription</title>
      </Head>
      <h1 style={{ textAlign: 'center', marginTop: '35px' }}>
        Inscription
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
          {error && <Error>{error}</Error>}
          {isRegistered ? (
            <div>
              Félicitation {isRegistered.pseudo} ! Vous pouvez vous
              connecter
            </div>
          ) : (
            <form onSubmit={handleSubmit(onFormSubmittedHandler)}>
              <p>
                <label htmlFor='pseudo'>Pseudo</label>
                <input
                  type='text'
                  placeholder='pseudo'
                  className='input'
                  {...register('pseudo', {
                    required: true,
                  })}
                />
                {errors.pseudo && (
                  <small>Veuillez renseigner ce champ.</small>
                )}
              </p>
              <p>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  placeholder='E-mail'
                  className='input'
                  {...register('email', {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errors.email && errors.email.type === 'required' && (
                  <small>Veuillez renseigner ce champ.</small>
                )}
                {errors.email && errors.email.type === 'pattern' && (
                  <small>
                    Votre adresse Email n'est pas correct.
                  </small>
                )}
              </p>
              <p>
                <label htmlFor='password'>Mot de passe</label>
                <input
                  type='password'
                  placeholder='Mot de passe'
                  className='input'
                  {...register('password', {
                    required: true,
                  })}
                />
                {errors.password && (
                  <small>Veuillez renseigner ce champ.</small>
                )}
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
                    "Je m'inscris"
                  )}
                </Button>
              </div>
            </form>
          )}
        </main>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  // Si l'utilisateur n'est pas connecté
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
