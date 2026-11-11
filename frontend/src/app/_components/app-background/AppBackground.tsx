// Fondo compartido: tres imágenes que cambian con transición en bucle infinito.
// Las imágenes deben estar en frontend/public/ (se sirven como /1.jpeg, /2.jpeg, /3.jpeg).
import styles from './app-background.module.css';

const IMAGES = ['/1.jpeg', '/2.jpeg', '/3.jpeg'];

// Cada imagen se muestra 5 segundos. Con 3 imágenes el ciclo completo dura 15 s.
// Cada imagen empieza a aparecer con un retraso de 5 s respecto a la anterior.
const CYCLE_SECONDS = 15;

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
            animationDelay: `${(CYCLE_SECONDS / IMAGES.length) * i}s`,
          }}
        />
      ))}
      <div className={styles.overlay} />
    </div>
  );
}
