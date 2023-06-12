// Librairies
import Head from 'next/head';
import { useState } from 'react';
import { SpinnerDotted } from 'spinners-react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth';
import { useRouter } from 'next/router';

// Components
import Button from '@/components/ui/Button/Button';
import Error from '@/components/ui/Error/Error';

export default function Connexion() {
  // Variables
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  // Methods
  const onFormSubmittedHandler = async (data) => {
    setLoading(true);
    setError(null);

    const resultat = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setLoading(false);

    if (resultat.error) {
      setError(resultat.error);
    } else {
      // Redirection
      router.replace('/');
    }
  };

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
          {error && <Error>{error}</Error>}
          <form onSubmit={handleSubmit(onFormSubmittedHandler)}>
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
