import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { SpinnerDotted } from 'spinners-react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

// Components
import Button from '@/components/ui/Button/Button';
import Error from '@/components/ui/Error/Error';

export default function Ajouter() {
  // Variable
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  // Méthodes
  const onSubmittedHandler = async (data) => {
    // Vérification du chargement
    if (!loading) {
      setLoading(true);
      setError(null);
      // Envoi des données sur notre API Next
      const response = await fetch('/api/projet', {
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
        // Redirection vers la page du projet
        router.replace(`/projets/${fetchedData.projet.slug}`);
      }
    }
  };
  return (
    <>
      <Head>
        <title>Julien | Ajouter un projet</title>
      </Head>
      <h1 style={{ textAlign: 'center', marginTop: '35px' }}>
        Ajouter un projet
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
          {(errors.titre ||
            errors.slug ||
            errors.client ||
            errors.annee ||
            errors.description ||
            errors.contenu) && (
            <Error>
              Veuillez remplir tous les champs du formulaire !
            </Error>
          )}
          {error && <Error>{error}</Error>}

          <form onSubmit={handleSubmit(onSubmittedHandler)}>
            <p>
              <label htmlFor='titre'>Titre</label>
              <input
                id='titre'
                placeholder='Titre du projet'
                className='input'
                {...register('titre', {
                  required: true,
                })}
              />
            </p>
            <p>
              <label htmlFor='slug'>Slug</label>
              <input
                id='slug'
                placeholder='Slug du projet'
                className='input'
                {...register('slug', {
                  required: true,
                })}
              />
            </p>
            <p>
              <label htmlFor='client'>Client</label>
              <input
                id='client'
                placeholder='Client associé du projet'
                className='input'
                {...register('client', {
                  required: true,
                })}
              />
            </p>
            <p>
              <label htmlFor='annee'>Année</label>
              <input
                id='annee'
                placeholder='Année de création du projet'
                className='input'
                {...register('annee', {
                  required: true,
                })}
              />
            </p>
            <p>
              <label htmlFor='description'>Description</label>
              <textarea
                id='description'
                placeholder='Description du projet'
                className='input'
                {...register('description', {
                  required: true,
                })}
                rows='5'
              ></textarea>
            </p>
            <p>
              <label htmlFor='contenu'>Contenu</label>
              <textarea
                id='contenu'
                placeholder='Contenu du projet'
                className='input'
                {...register('contenu', {
                  required: true,
                })}
                rows='5'
              ></textarea>
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
                  'Ajouter'
                )}
              </Button>
            </div>
          </form>
        </main>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  // Si l'utilisateur n'est pas connecté
  if (!session) {
    return {
      redirect: {
        destination: '/connexion',
        permanent: false,
      },
    };
  }

  if (session && !session.user.roles.includes('administrateur')) {
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
