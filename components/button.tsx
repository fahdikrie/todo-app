import clsx from 'clsx';

import cls from './button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'solid' | 'ghost';
  theme?: 'normal' | 'danger';
  onClick?: () => void;
};

const Button = ({
  children,
  variant = 'solid',
  theme = 'normal',
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={clsx(cls.button, cls[variant], cls[theme])}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
