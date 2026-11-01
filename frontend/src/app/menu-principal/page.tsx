'use client';

import styles from './menu.module.css';

export default function MenuPage() {
  return (
    <div className={styles.container}>
      
      {/* Contenido de presentación (puedes personalizarlo) */}
      <div className={styles.content}>
        <h1>Bienvenido al Menú</h1>
        <p>Selecciona una opción para continuar</p>
      </div>

    </div>
  );
}