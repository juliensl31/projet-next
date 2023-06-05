// Librairies
import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

export default function MonDocument() {
  return (
    <Html lang='fr'>
      <Head>
        <meta
          name='description'
          content='Julien, développeur web et web mobile'
        />
        <meta
          name='keywords'
          content='développeur web, développeur web mobile, développeur full-stack, développeur front-end, développeur back-end, développeur javascript, développeur react, développeur node, développeur next, développeur express, développeur mongodb'
        />
        <meta name='author' content='Julien' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
