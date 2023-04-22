import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

import cls from './button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'solid' | 'ghost';
  theme?: 'normal' | 'danger';
  onClick?: () => void;
}

const Button = ({
  children,
  variant = 'solid',
  theme = 'normal',
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(cls.button, cls[variant], cls[theme])}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
