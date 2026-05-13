import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Trilha de navegação" className={styles.wrapper}>
      <div className={styles.inner}>
        <ol className={styles.lista} itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((item, idx) => {
            const ultimo = idx === items.length - 1;
            return (
              <li
                key={idx}
                className={styles.item}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {idx > 0 && (
                  <ChevronRight size={12} className={styles.separador} aria-hidden="true" />
                )}
                {item.href && !ultimo ? (
                  <Link href={item.href} className={styles.link} itemProp="item">
                    <span itemProp="name">{item.label}</span>
                  </Link>
                ) : (
                  <span
                    className={ultimo ? styles.atual : styles.link}
                    aria-current={ultimo ? 'page' : undefined}
                    itemProp="name"
                  >
                    {item.label}
                  </span>
                )}
                <meta itemProp="position" content={String(idx + 1)} />
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
