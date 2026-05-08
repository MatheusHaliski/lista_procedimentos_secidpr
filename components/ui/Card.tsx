import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className, padding = 'md', hover, onClick }: CardProps) {
  const Tag = onClick ? 'div' : 'div';
  return (
    <Tag
      className={`${styles.card} ${styles[padding]} ${hover ? styles.hover : ''} ${className || ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
    >
      {children}
    </Tag>
  );
}
