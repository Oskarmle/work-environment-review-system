import { createFileRoute } from '@tanstack/react-router';
import styles from './dashboard.module.css';
import Logo from '../../../components/logo/Logo';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={styles.dashboard}>
      <Logo />
      <div></div>
    </div>
  );
}
