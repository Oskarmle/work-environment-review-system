import type { ReactNode } from 'react';
import styles from './custom-card.module.css';

interface CustomCardProps {
  children?: ReactNode;
  title?: string;
}

const CustomCard = ({ children, title }: CustomCardProps) => {
  return (
    <div className={styles.customCard}>
      <h5 className={styles.title}>{title}</h5>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default CustomCard;
