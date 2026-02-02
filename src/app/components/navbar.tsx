'use client';

import { useEffect, useState } from 'react';
import styles from '../styles/navbar.module.css';

const sections = ['home', 'experience', 'projects', 'about'];

export default function Navbar() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: null,
        threshold: 0.6,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className={styles.navbar}>
      <ul className={styles.menu}>
        {sections.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={active === id ? styles.active : ''}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
