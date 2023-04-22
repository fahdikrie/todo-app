import { HTMLProps } from 'react';

import cls from './card.module.css';

interface CardProps extends HTMLProps<HTMLElement> {
  children: React.ReactNode;
  className?: HTMLProps<HTMLElement>['className'];
}

const Card = ({ children, className }: CardProps) => {
  return <div className={`${cls.card} ${className}`}>{children}</div>;
};

export default Card;
