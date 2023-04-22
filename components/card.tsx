import { HTMLProps } from 'react';

import cls from './card.module.css';

type CardProps = {
  children: React.ReactNode;
  className?: HTMLProps<HTMLElement>['className'];
};

const Card = ({ children, className }: CardProps) => {
  return <div className={`${cls.card} ${className}`}>{children}</div>;
};

export default Card;
