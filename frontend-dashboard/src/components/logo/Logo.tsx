import styles from './logo.module.css';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img
        src="images/HBR-Logo-bredt-hvid.png"
        alt="Logo"
        className={styles.logoImage}
      />
      <h1>Arbejdsmiljørundering</h1>
    </div>
  );
};

export default Logo;
