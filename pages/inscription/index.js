// Librairies
import Head from 'next/head';
import { useState } from 'react';
import { SpinnerDotted } from 'spinners-react';
import { useForm } from 'react-hook-form';

// Components
import Button from '@/components/ui/Button/Button';

export default function Inscription() {
  // Variable
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Methods
  const onFormSubmittedHandler = (data) => {
    console.log(data);
  };

  // States
  const [loading, setLoading] = useState(false);

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
                <small>Votre adresse Email n'est pas correct.</small>
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
        </main>
      </section>
    </>
  );
}
