import clsx from 'clsx';
import styles from './Button.module.sass';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  style,
  children,
  onClick,
}) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], className)}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};
