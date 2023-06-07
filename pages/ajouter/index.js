import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { SpinnerDotted } from 'spinners-react';
import { useState } from 'react';
import { useRouter } from 'next/router';

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
      <h1>Ajouter un projet</h1>
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
            <div
              style={{
                background: '#ee6c4d',
                color: 'white',
                padding: '15px',
                borderRadius: '5px',
                marginBottom: '15px',
                textAlign: 'center',
              }}
            >
              Veuillez remplir tous les champs du formulaire !
            </div>
          )}
          {error && (
            <div
              style={{
                background: '#ee6c4d',
                color: 'white',
                padding: '15px',
                borderRadius: '5px',
                marginBottom: '15px',
                textAlign: 'center',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmittedHandler)}>
            <p>
              <label htmlFor='titre'>Titre</label>
              <input
                id='titre'
                placeholder='Titre du projet'
                style={{
                  display: 'block',
                  width: '400px',
                  border: '1px solid gray',
                  padding: '10px 15px 10px 15px',
                  borderRadius: '5px',
                  marginTop: '5px',
                }}
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
                style={{
                  display: 'block',
                  width: '400px',
                  border: '1px solid gray',
                  padding: '10px 15px 10px 15px',
                  borderRadius: '5px',
                  marginTop: '5px',
                }}
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
                style={{
                  display: 'block',
                  width: '400px',
                  border: '1px solid gray',
                  padding: '10px 15px 10px 15px',
                  borderRadius: '5px',
                  marginTop: '5px',
                }}
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
                style={{
                  display: 'block',
                  width: '400px',
                  border: '1px solid gray',
                  padding: '10px 15px 10px 15px',
                  borderRadius: '5px',
                  marginTop: '5px',
                }}
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
                style={{
                  display: 'block',
                  width: '400px',
                  border: '1px solid gray',
                  padding: '10px 15px 10px 15px',
                  borderRadius: '5px',
                  marginTop: '5px',
                  fontFamily: 'arial',
                }}
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
                style={{
                  display: 'block',
                  width: '400px',
                  border: '1px solid gray',
                  padding: '10px 15px 10px 15px',
                  borderRadius: '5px',
                  marginTop: '5px',
                  fontFamily: 'arial',
                }}
                {...register('contenu', {
                  required: true,
                })}
                rows='5'
              ></textarea>
            </p>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <button
                style={{
                  border: 0,
                  background: '#ee6c4d',
                  color: 'white',
                  padding: '10px 15px 10px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
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
              </button>
            </div>
          </form>
        </main>
      </section>
    </>
  );
}
