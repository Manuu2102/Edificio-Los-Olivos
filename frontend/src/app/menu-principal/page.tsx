import Link from 'next/link';
import AppShell from '../_components/app-shell/AppShell';
import styles from './menu-principal.module.css';

type IconName = 'users' | 'home' | 'building' | 'parking' | 'link' | 'history' | 'briefcase' | 'shield' | 'arrow' | 'box';

const ICON_PATHS: Record<IconName, string[]> = {
  users: [
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
    'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
    'M22 21v-2a4 4 0 0 0-3-3.87',
    'M16 3.13a4 4 0 0 1 0 7.75',
  ],
  home: ['M3 10.5L12 3l9 7.5V21H3z', 'M9 21v-6h6v6'],
  building: [
    'M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16',
    'M16 9h2a2 2 0 0 1 2 2v10',
    'M4 21h16',
    'M8 7h2',
    'M8 11h2',
    'M8 15h2',
  ],
  parking: ['M5 3h7a5 5 0 0 1 0 10H9v8H5z', 'M9 7h3a2 2 0 0 1 0 4H9'],
  box: ['M21 8l-9-5-9 5v8l9 5 9-5z', 'M3.27 6.96L12 12.01l8.73-5.05', 'M12 22.08V12'],
  link: [
    'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
    'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  ],
  history: ['M3 12a9 9 0 1 0 3-6.7L3 8', 'M3 3v5h5', 'M12 7v5l3 2'],
  briefcase: ['M3 7h18v13H3z', 'M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'],
  shield: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
  arrow: ['M5 12h14', 'M12 5l7 7-7 7'],
};

function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

type Module = {
  label: string;
  description: string;
  href: string;
  icon: IconName;
};

type Section = {
  title: string;
  modules: Module[];
};

const SECTIONS: Section[] = [
  {
    title: 'Administración',
    modules: [
      { label: 'Copropietarios', description: 'Propietarios registrados', href: '/copropietarios', icon: 'users' },
      { label: 'Inquilinos', description: 'Residentes y contratos', href: '/inquilinos', icon: 'home' },
      { label: 'Departamentos', description: 'Unidades del edificio', href: '/departamentos', icon: 'building' },
      { label: 'Parqueos', description: 'Espacios asignados', href: '/parqueos', icon: 'parking' },
      { label: 'Bauleras', description: 'Espacios de almacenamiento', href: '/bauleras', icon: 'box' },
      { label: 'Historial de ocupantes', description: 'Movimientos de ocupación', href: '/historial-ocupantes', icon: 'history' },
      { label: 'Empleados', description: 'Personal y sueldos', href: '/empleados', icon: 'briefcase' },
    ],
  },
  {
    title: 'Seguridad',
    modules: [
      { label: 'Seguridad y auditoría', description: 'Accesos y registros', href: '/seguridad', icon: 'shield' },
    ],
  },
];

const ADMIN_SECTION = SECTIONS[0];
const OTHER_SECTIONS = SECTIONS.slice(1);

const BUILDING_NAME = 'Edificio Los Olivos';

export default function MenuPrincipalPage() {
  return (
    <AppShell>
      <div className={styles.intro}>
        <h2>Bienvenido</h2>
        <p>Selecciona un módulo para comenzar</p>
      </div>

      <div className={styles.groups}>
        <section className={styles.group}>
          <h3 className={styles.groupTitle}>{ADMIN_SECTION.title}</h3>

          <div className={styles.grid}>
            {ADMIN_SECTION.modules.map((mod) => (
              <Link key={mod.href} href={mod.href} className={styles.card}>
                <div className={styles.cardIcon}>
                  <Icon name={mod.icon} />
                </div>
                <div className={styles.cardText}>
                  <h4>{mod.label}</h4>
                  <p>{mod.description}</p>
                </div>
                <Icon name="arrow" className={styles.cardArrow} />
              </Link>
            ))}
          </div>
        </section>

        <div className={styles.groupStack}>
          {OTHER_SECTIONS.map((section) => (
            <section key={section.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{section.title}</h3>

              <div className={styles.gridOne}>
                {section.modules.map((mod) => (
                  <Link key={mod.href} href={mod.href} className={styles.card}>
                    <div className={styles.cardIcon}>
                      <Icon name={mod.icon} />
                    </div>
                    <div className={styles.cardText}>
                      <h4>{mod.label}</h4>
                      <p>{mod.description}</p>
                    </div>
                    <Icon name="arrow" className={styles.cardArrow} />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className={styles.footerText}>
        <Icon name="shield" className={styles.footerIcon} />
        Acceso exclusivo para usuarios autorizados de {BUILDING_NAME}
      </div>
    </AppShell>
  );
}
