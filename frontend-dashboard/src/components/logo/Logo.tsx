import { useNavigate, useRouter } from '@tanstack/react-router';
import styles from './logo.module.css';
import { Button } from '@mui/material';
import keycloak from '../../utils/keycloak';

const Logo = () => {
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate({ to: '/frontpage' });
  };

  const handleLogout = () => {
    keycloak.logout({ redirectUri: window.location.origin });
  };

  return (
    <div className={styles.logoContainer}>
      <div className={styles.logo}>
        <img
          src="images/HBR-Logo-bredt-hvid.png"
          alt="Logo"
          className={styles.logoImage}
        />
        <h1>Arbejdsmiljørundering</h1>
      </div>
      <div className={styles['button-box']}>
        {currentPath !== '/frontpage' && (
          <Button
            className={styles.button}
            color="secondary"
            onClick={handleNavigation}
            variant="contained"
          >
            Forside
          </Button>
        )}
        <Button
          className={styles.button}
          color="warning"
          onClick={handleLogout}
          variant="contained"
        >
          Log ud
        </Button>
      </div>
    </div>
  );
};

export default Logo;
