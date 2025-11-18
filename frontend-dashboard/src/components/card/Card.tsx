import styles from './card.module.css';

type CardProps = {
  title: string;
  children?: React.ReactNode;
};

const Card = ({ title, children }: CardProps) => {
  return (
    <main className={styles.card}>
      <h2>{title}</h2>
      {children}
    </main>
  );
};

export default Card;
