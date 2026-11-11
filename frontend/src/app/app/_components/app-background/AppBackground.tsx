// Fondo compartido: tres imágenes que cambian con transición en bucle infinito.
// Las imágenes deben estar en frontend/public/ (se sirven como /1.jpeg, /2.jpeg, /3.jpeg).
import styles from './app-background.module.css';

const IMAGES = ['/1.jpeg', '/2.jpeg', '/3.jpeg'];

// Duración total del ciclo de cada imagen (en segundos).
// Con 3 imágenes, cada una arranca con un desfase de CYCLE / 3.
const CYCLE_SECONDS = 18;

export default function AppBackground() {
  return (
    <div className={styles.bg} aria-hidden="true">
      {IMAGES.map((src, i) => (
        <div
          key={src}
          className={styles.slide}
          style={{
            backgroundImage: `url(${src})`,
            animationDuration: `${CYCLE_SECONDS}s`,
            animationDelay: `${-(CYCLE_SECONDS / IMAGES.length) * i}s`,
          }}
        />
      ))}
      <div className={styles.overlay} />
    </div>
  );
}
