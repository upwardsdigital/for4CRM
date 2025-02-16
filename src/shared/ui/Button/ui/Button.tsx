import clsx from 'clsx';
import styles from './Button.module.sass';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  style,
  children,
  loading,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], className, styles[variant])}
      onClick={onClick}
      disabled={loading || disabled}
      style={style}
    >
      {children}
    </button>
  );
};
