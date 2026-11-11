'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './app-shell.module.css';
import AppBackground from '../app-background/AppBackground';

const MOBILE_QUERY = '(max-width: 1099px)';
const COMPACT_QUERY = '(min-width: 1100px) and (max-width: 1279px)';
const COLLAPSED_KEY = 'sidebar-collapsed';
const BUILDING_NAME = 'Edificio Los Olivos';
const USER = { name: 'jack kevin', role: 'Administrador', initials: 'JK' };

type IconName =
  | 'users'
  | 'home'
  | 'building'
  | 'parking'
  | 'link'
  | 'box'
  | 'folder'
  | 'history'
  | 'briefcase'
  | 'wallet'
  | 'card'
  | 'tool'
  | 'file'
  | 'shield'
  | 'logout'
  | 'grid'
  | 'menu'
  | 'close'
  | 'chevronLeft'
  | 'chevronRight';

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
  folder: ['M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'],
  box: ['M21 8l-9-5-9 5v8l9 5 9-5z', 'M3.27 6.96L12 12.01l8.73-5.05', 'M12 22.08V12'],
  link: [
    'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
    'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  ],
  history: ['M3 12a9 9 0 1 0 3-6.7L3 8', 'M3 3v5h5', 'M12 7v5l3 2'],
  briefcase: ['M3 7h18v13H3z', 'M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'],
  wallet: [
    'M2 7h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z',
    'M2 7V5a2 2 0 0 1 2-2h14',
    'M16 14h.01',
  ],
  card: ['M1 5h22v14H1z', 'M1 10h22'],
  tool: ['M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z'],
  file: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6'],
  shield: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
  logout: ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'M16 17l5-5-5-5', 'M21 12H9'],
  grid: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'],
  menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
  close: ['M6 6l12 12', 'M18 6L6 18'],
  chevronLeft: ['M15 18l-6-6 6-6'],
  chevronRight: ['M9 18l6-6-6-6'],
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
  href: string;
  icon: IconName;
};

type Section = {
  title: string;
  modules: Module[];
};

// Menú compartido por todas las pantallas del sistema.
const SECTIONS: Section[] = [
  {
    title: 'Administración',
    modules: [
      { label: 'Copropietarios', href: '/copropietarios', icon: 'users' },
      { label: 'Inquilinos', href: '/inquilinos', icon: 'home' },
      { label: 'Departamentos', href: '/departamentos', icon: 'building' },
      { label: 'Parqueos', href: '/parqueos', icon: 'parking' },
      { label: 'Bauleras', href: '/bauleras', icon: 'box' },
      { label: 'Empleados', href: '/empleados', icon: 'briefcase' },
      { label: 'Expedientes', href: '/expedientes', icon: 'folder' },
    ],
  },
  {
    title: 'Finanzas',
    modules: [
      { label: 'Expensas y finanzas', href: '/finanzas', icon: 'wallet' },
      { label: 'Pagos a empleados', href: '/pagos-empleados', icon: 'card' },
    ],
  },
  {
    title: 'Operaciones',
    modules: [{ label: 'Mantenimiento', href: '/mantenimiento', icon: 'tool' }],
  },
  {
    title: 'Documentos',
    modules: [{ label: 'Gestión documental', href: '/documentos', icon: 'file' }],
  },
  {
    title: 'Seguridad',
    modules: [{ label: 'Seguridad y auditoría', href: '/seguridad', icon: 'shield' }],
  },
];

export default function AppShell({ children, actions }: { children: ReactNode; actions?: ReactNode }) {
  const pathname = usePathname();
  // Escritorio: `collapsed` convierte la barra lateral en un riel de solo iconos.
  const [collapsed, setCollapsed] = useState(false);
  // Tablet/celular: `open` despliega la barra lateral como panel.
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [nombre, ...resto] = BUILDING_NAME.split(' ');

  // En tablet/celular la barra lateral es un panel: se oculta al cambiar de tamaño.
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = () => {
      setIsMobile(mq.matches);
      if (mq.matches) setOpen(false);
    };
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Cada página monta su propia barra lateral, así que la preferencia oculto/visible
  // se guarda en el navegador para que no se reinicie al cambiar de pantalla.
  useEffect(() => {
    const mq = window.matchMedia(COMPACT_QUERY);
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(COLLAPSED_KEY);
    } catch {
      saved = null;
    }
    setCollapsed(saved !== null ? saved === '1' : mq.matches);

    // En pantallas medianas (1100–1279 px) el riel de iconos se activa solo al achicar.
    const onChange = () => {
      if (mq.matches) setCollapsed(true);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const handleSidebarToggle = () => {
    if (isMobile) {
      setOpen(false);
      return;
    }
    const next = !collapsed;
    setCollapsed(next);
    try {
      window.localStorage.setItem(COLLAPSED_KEY, next ? '1' : '0');
    } catch {
      // Si el navegador bloquea el almacenamiento, la preferencia dura solo mientras la página esté abierta.
    }
  };

  const closeDrawer = () => setOpen(false);

  const railOpen = collapsed && !isMobile;

  return (
    <div className={styles.page}>
      <AppBackground />
      {open && <div className={styles.backdrop} onClick={closeDrawer} aria-hidden="true" />}

      <aside
        id="sidebar"
        className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''} ${open ? styles.open : ''}`}
      >
        <div className={styles.sidebarBrand}>
          <Link href="/menu-principal" className={styles.brandGroup} onClick={closeDrawer}>
            <div className={styles.logoChip}>
              <Icon name="building" className={styles.logoIcon} />
            </div>
            <div className={styles.brandText}>
              <h1>
                {nombre} <span>{resto.join(' ')}</span>
              </h1>
              <p>Administración</p>
            </div>
          </Link>

          <button
            type="button"
            className={styles.drawerClose}
            aria-label={railOpen ? 'Mostrar barra lateral' : 'Ocultar barra lateral'}
            title={railOpen ? 'Mostrar' : 'Ocultar'}
            onClick={handleSidebarToggle}
          >
            <Icon name={railOpen ? 'chevronRight' : 'chevronLeft'} />
          </button>
        </div>

        <nav className={styles.nav} aria-label="Menú principal">
          <div className={styles.navSection}>
            <h3 className={styles.navTitle}>Principal</h3>
            <Link
              href="/menu-principal"
              title="Home"
              className={`${styles.navItem} ${pathname === '/menu-principal' ? styles.navItemActive : ''}`}
              aria-current={pathname === '/menu-principal' ? 'page' : undefined}
              onClick={closeDrawer}
            >
              <Icon name="grid" className={styles.navIcon} />
              <span className={styles.navLabel}>Home</span>
              {pathname === '/menu-principal' && <span className={styles.activeDot} aria-hidden="true" />}
            </Link>
          </div>

          {SECTIONS.map((section) => (
            <div key={section.title} className={styles.navSection}>
              <h3 className={styles.navTitle}>{section.title}</h3>

              {section.modules.map((mod) => {
                const active = pathname === mod.href;
                return (
                  <Link
                    key={mod.href}
                    href={mod.href}
                    title={mod.label}
                    className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
                    aria-current={active ? 'page' : undefined}
                    onClick={closeDrawer}
                  >
                    <Icon name={mod.icon} className={styles.navIcon} />
                    <span className={styles.navLabel}>{mod.label}</span>
                    {active && <span className={styles.activeDot} aria-hidden="true" />}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userChip}>
            <div className={styles.avatar}>{USER.initials}</div>
            <div className={styles.userInfo}>
              <strong>{USER.name}</strong>
              <span>{USER.role}</span>
            </div>
          </div>
          <Link href="/login" className={styles.logoutBtn} title="Cerrar sesión" onClick={closeDrawer}>
            <Icon name="logout" />
            <span>Cerrar sesión</span>
          </Link>
        </div>
      </aside>

      <main className={styles.content}>
        <div className={styles.topBar}>
          <button
            type="button"
            className={styles.menuToggle}
            aria-controls="sidebar"
            aria-label="Abrir menú"
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" />
          </button>
          <span className={styles.topBarTitle}>
            {nombre} <span>{resto.join(' ')}</span>
          </span>

          {actions && <div className={styles.topBarActions}>{actions}</div>}
        </div>

        {children}
      </main>
    </div>
  );
}
