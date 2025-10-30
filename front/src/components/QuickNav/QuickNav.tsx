import { Link, useLocation } from 'react-router-dom';
import styles from './QuickNav.module.css';

function QuickNav() {
  const location = useLocation();
  const isSimaPage = location.pathname.includes('/sima');

  if (!isSimaPage) {
    return null;
  }

  return (
    <nav className={styles.navContainer}>
      {/* Este wrapper interno alinha os botões com o conteúdo da página */}
      <div className={styles.navWrapper}>
        <Link to="/" className={styles.navButton}>
          Página Inicial
        </Link>
        <Link to="/mapa" className={styles.navButton}>
          Mapa Interativo
        </Link>
      </div>
    </nav>
  );
}

export default QuickNav;