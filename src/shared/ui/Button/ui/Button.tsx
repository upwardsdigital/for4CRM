import clsx from 'clsx';
import styles from './Button.module.sass';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outlined';
  children: React.ReactNode;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  color?: 'primary' | 'white';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  style,
  type,
  children,
  loading,
  disabled,
  color = 'primary',
  onClick,
}) => {
  return (
    <button
      type={type}
      className={clsx(styles.button, styles[variant], className, styles[color])}
      onClick={onClick}
      disabled={loading || disabled}
      style={style}
    >
      {loading ? 'Загрузка...' : children}
    </button>
  );
};
