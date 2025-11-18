import styles from './button.module.css';

type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  type: 'button' | 'submit' | 'reset';
  size: 'md' | 'lg';
};

const Button = ({
  text,
  onClick,
  disabled = false,
  type,
  size,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[size]}`}
    >
      {text}
    </button>
  );
};

export default Button;
