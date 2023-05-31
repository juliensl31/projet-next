export default function Home(props) {
  return (
    <>
      <main>
        <h1>Bienvenue sur mon projet</h1>
        <h2>
          Le prix du bitcoin est de {props.prixBitcoin} €
        </h2>
      </main>
    </>
  );
}

export async function getStaticProps() {
  let bitcoinEnEuros;
  await fetch('https://blockchain.info/ticker')
    .then((response) => response.json())
    .then((data) => (bitcoinEnEuros = data.EUR.last));

  return {
    props: {
      prixBitcoin: bitcoinEnEuros,
    },
  };
}
