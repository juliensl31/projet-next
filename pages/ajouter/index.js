import Head from 'next/head';
import { useForm } from 'react-hook-form';

export default function Ajouter() {
  // Variable
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
          <form>
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
                rows='5'
              ></textarea>
            </p>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <button
                type='submit'
                style={{
                  border: 0,
                  background: '#ee6c4d',
                  color: 'white',
                  padding: '10px 15px 10px 15px',
                  borderRadius: '5px',
                }}
              >
                Ajouter
              </button>
            </div>
          </form>
        </main>
      </section>
    </>
  );
}
