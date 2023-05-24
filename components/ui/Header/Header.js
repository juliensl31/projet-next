export default function Header() {
  return (
    <header>
      <div
        className='container'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ margin: 0 }}>Julien</h1>
        <nav>
          <ul
            style={{
              display: 'flex',
              listStyleType: 'none',
              margin: 0,
              padding: 0,
              gap: '15px',
            }}
          >
            <li>
              <a href=''>Accueil</a>
            </li>
            <li>
              <a href=''>Projets</a>
            </li>
            <li>
              <a href=''>Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
