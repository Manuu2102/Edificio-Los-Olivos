'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import AppShell from '../_components/app-shell/AppShell';
import styles from './expedientes.module.css';

type IconName =
  | 'users'
  | 'home'
  | 'briefcase'
  | 'building'
  | 'parking'
  | 'box'
  | 'grid'
  | 'search'
  | 'close'
  | 'check'
  | 'chevron'
  | 'edit'
  | 'trash';

const ICON_PATHS: Record<IconName, string[]> = {
  users: [
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
    'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
    'M22 21v-2a4 4 0 0 0-3-3.87',
    'M16 3.13a4 4 0 0 1 0 7.75',
  ],
  home: ['M3 10.5L12 3l9 7.5V21H3z', 'M9 21v-6h6v6'],
  briefcase: ['M3 7h18v13H3z', 'M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'],
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
  grid: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'],
  search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.35-4.35'],
  close: ['M6 6l12 12', 'M18 6L6 18'],
  check: ['M20 6L9 17l-5-5'],
  chevron: ['M6 9l6 6 6-6'],
  edit: ['M12 20h9', 'M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z'],
  trash: ['M3 6h18', 'M8 6V4h8v2', 'M19 6l-1 14H6L5 6'],
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

// Datos de prueba. Más adelante se reemplazarán por los datos del backend.
const DEPARTAMENTOS = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'];
const TIPOS = ['Departamento tipo A', 'Departamento tipo B', 'Departamento tipo C'];
const ESTADOS = ['Activo', 'Inactivo'];
const RESPONSABLES = [
  'Carlos Mendoza Rojas (Copropietario)',
  'María Fernanda Soliz (Copropietario)',
  'Javier Arce Quispe (Copropietario)',
  'Lucía Paredes Gutiérrez (Inquilino)',
  'Diego Romero Villca (Inquilino)',
  'Patricia Ríos Aguilar (Inquilino)',
];

type EntityKey = 'copropietarios' | 'inquilinos' | 'empleados' | 'departamentos' | 'parqueos' | 'bauleras';
type TabKey = 'resumen' | EntityKey;
type Registro = Record<string, string>;
type Campo = {
  key: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'select';
  opciones?: string[];
  required?: boolean;
  placeholder?: string;
};
type Entidad = {
  key: EntityKey;
  label: string;
  icon: IconName;
  principal: string;
  sub?: string;
  campos: Campo[];
  seed: Registro[];
};
type Ocupante = {
  id: string;
  tipo: 'Copropietario' | 'Inquilino';
  nombre: string;
  ci: string;
  correo: string;
  telefono: string;
  departamento: string;
  estado: string;
  fecha: string;
};

const ESTADO_CAMPO: Campo = { key: 'estado', label: 'Estado', type: 'select', opciones: ESTADOS, required: true };

const ENTIDADES: Entidad[] = [
  {
    key: 'copropietarios',
    label: 'Copropietarios',
    icon: 'users',
    principal: 'nombre',
    sub: 'departamento',
    campos: [
      { key: 'nombre', label: 'Nombre completo', required: true, placeholder: 'Ej. Carlos Mendoza Rojas' },
      { key: 'ci', label: 'Cédula de identidad (CI)', required: true, placeholder: 'Ej. 5214786 LP' },
      { key: 'departamento', label: 'Departamento', type: 'select', opciones: DEPARTAMENTOS, required: true, placeholder: 'Selecciona un departamento' },
      { key: 'correo', label: 'Correo electrónico', type: 'email', required: true, placeholder: 'correo@ejemplo.com' },
      { key: 'telefono', label: 'Teléfono', type: 'tel', placeholder: '+591 7XX XXXXX' },
      ESTADO_CAMPO,
    ],
    seed: [
      { id: '1', nombre: 'Carlos Mendoza Rojas', ci: '5214786 LP', correo: 'carlos.mendoza@mail.com', telefono: '+591 711 22334', departamento: '1A', fecha: '12/03/2025', estado: 'Activo' },
      { id: '2', nombre: 'María Fernanda Soliz', ci: '6638120 CB', correo: 'mfsoliz@mail.com', telefono: '+591 722 45678', departamento: '2B', fecha: '28/07/2025', estado: 'Activo' },
      { id: '3', nombre: 'Javier Arce Quispe', ci: '4870321 SC', correo: 'javier.arce@mail.com', telefono: '+591 733 98765', departamento: '3A', fecha: '15/01/2026', estado: 'Inactivo' },
    ],
  },
  {
    key: 'inquilinos',
    label: 'Inquilinos',
    icon: 'home',
    principal: 'nombre',
    sub: 'departamento',
    campos: [
      { key: 'nombre', label: 'Nombre completo', required: true, placeholder: 'Ej. Lucía Paredes Gutiérrez' },
      { key: 'ci', label: 'Cédula de identidad (CI)', required: true, placeholder: 'Ej. 6125478 LP' },
      { key: 'departamento', label: 'Departamento que alquila', type: 'select', opciones: DEPARTAMENTOS, required: true, placeholder: 'Selecciona un departamento' },
      { key: 'correo', label: 'Correo electrónico', type: 'email', required: true, placeholder: 'correo@ejemplo.com' },
      { key: 'telefono', label: 'Teléfono', type: 'tel', placeholder: '+591 7XX XXXXX' },
      ESTADO_CAMPO,
    ],
    seed: [
      { id: '1', nombre: 'Lucía Paredes Gutiérrez', ci: '6125478 LP', departamento: '1B', telefono: '+591 744 11223', correo: 'lucia.paredes@mail.com', fecha: '05/02/2025', estado: 'Activo' },
      { id: '2', nombre: 'Diego Romero Villca', ci: '5873316 CB', departamento: '3A', telefono: '+591 755 67890', correo: 'diego.romero@mail.com', fecha: '19/09/2025', estado: 'Activo' },
      { id: '3', nombre: 'Patricia Ríos Aguilar', ci: '4590217 SC', departamento: '2A', telefono: '—', correo: 'pat.rios@mail.com', fecha: '03/04/2026', estado: 'Inactivo' },
    ],
  },
  {
    key: 'empleados',
    label: 'Empleados',
    icon: 'briefcase',
    principal: 'nombre',
    sub: 'cargo',
    campos: [
      { key: 'nombre', label: 'Nombre completo', required: true, placeholder: 'Ej. Roberto Gálvez Ticona' },
      { key: 'ci', label: 'Cédula de identidad (CI)', required: true, placeholder: 'Ej. 5102938 LP' },
      { key: 'cargo', label: 'Cargo', required: true, placeholder: 'Ej. Portero' },
      { key: 'horario', label: 'Horario', placeholder: 'Ej. 07:00 - 15:00' },
      { key: 'telefono', label: 'Teléfono', type: 'tel', placeholder: '+591 7XX XXXXX' },
      ESTADO_CAMPO,
    ],
    seed: [
      { id: '1', nombre: 'Roberto Gálvez Ticona', ci: '5102938 LP', cargo: 'Portero', horario: '07:00 - 15:00', telefono: '+591 766 10101', fecha: '03/02/2025', estado: 'Activo' },
      { id: '2', nombre: 'Lidia Condori Mamani', ci: '6207741 CB', cargo: 'Limpieza', horario: '08:00 - 12:00', telefono: '+591 777 20202', fecha: '20/08/2025', estado: 'Activo' },
      { id: '3', nombre: 'Éver Vargas Limachi', ci: '4983310 SC', cargo: 'Mantenimiento', horario: '13:00 - 19:00', telefono: '—', fecha: '11/04/2026', estado: 'Inactivo' },
    ],
  },
  {
    key: 'departamentos',
    label: 'Departamentos',
    icon: 'building',
    principal: 'numero',
    sub: 'tipo',
    campos: [
      { key: 'numero', label: 'Número de departamento', type: 'select', opciones: DEPARTAMENTOS, required: true, placeholder: 'Selecciona un departamento' },
      { key: 'piso', label: 'Piso', required: true, placeholder: 'Ej. 1' },
      { key: 'tipo', label: 'Tipo', type: 'select', opciones: TIPOS, required: true, placeholder: 'Selecciona un tipo' },
      ESTADO_CAMPO,
    ],
    seed: [
      { id: '1', numero: '1A', piso: '1', tipo: 'Departamento tipo A', fecha: '12/03/2025', estado: 'Activo' },
      { id: '2', numero: '1B', piso: '1', tipo: 'Departamento tipo B', fecha: '05/02/2025', estado: 'Activo' },
      { id: '3', numero: '2A', piso: '2', tipo: 'Departamento tipo A', fecha: '03/04/2026', estado: 'Activo' },
      { id: '4', numero: '2B', piso: '2', tipo: 'Departamento tipo C', fecha: '28/07/2025', estado: 'Activo' },
      { id: '5', numero: '3A', piso: '3', tipo: 'Departamento tipo B', fecha: '15/01/2026', estado: 'Activo' },
    ],
  },
  {
    key: 'parqueos',
    label: 'Parqueos',
    icon: 'parking',
    principal: 'numero',
    sub: 'responsable',
    campos: [
      { key: 'numero', label: 'Número de parqueo', required: true, placeholder: 'Ej. P-12' },
      { key: 'departamento', label: 'Departamento asignado', type: 'select', opciones: DEPARTAMENTOS, required: true, placeholder: 'Selecciona un departamento' },
      { key: 'responsable', label: 'Propietario o inquilino responsable', type: 'select', opciones: RESPONSABLES, required: true, placeholder: 'Selecciona un responsable' },
      ESTADO_CAMPO,
    ],
    seed: [
      { id: '1', numero: 'P-12', departamento: '1A', responsable: 'Carlos Mendoza Rojas (Copropietario)', fecha: '12/03/2025', estado: 'Activo' },
      { id: '2', numero: 'P-07', departamento: '3A', responsable: 'Diego Romero Villca (Inquilino)', fecha: '28/07/2025', estado: 'Activo' },
      { id: '3', numero: 'P-21', departamento: '3A', responsable: 'Javier Arce Quispe (Copropietario)', fecha: '15/01/2026', estado: 'Inactivo' },
    ],
  },
  {
    key: 'bauleras',
    label: 'Bauleras',
    icon: 'box',
    principal: 'numero',
    sub: 'responsable',
    campos: [
      { key: 'numero', label: 'Número de baulera', required: true, placeholder: 'Ej. B-07' },
      { key: 'departamento', label: 'Departamento asignado', type: 'select', opciones: DEPARTAMENTOS, required: true, placeholder: 'Selecciona un departamento' },
      { key: 'responsable', label: 'Propietario o inquilino responsable', type: 'select', opciones: RESPONSABLES, required: true, placeholder: 'Selecciona un responsable' },
      ESTADO_CAMPO,
    ],
    seed: [
      { id: '1', numero: 'B-03', departamento: '1A', responsable: 'Carlos Mendoza Rojas (Copropietario)', fecha: '12/03/2025', estado: 'Activo' },
      { id: '2', numero: 'B-11', departamento: '2B', responsable: 'María Fernanda Soliz (Copropietario)', fecha: '15/01/2026', estado: 'Activo' },
      { id: '3', numero: 'B-07', departamento: '2A', responsable: 'Patricia Ríos Aguilar (Inquilino)', fecha: '28/07/2025', estado: 'Inactivo' },
    ],
  },
];

const TABS: { key: TabKey; label: string; icon: IconName }[] = [
  { key: 'resumen', label: 'Resumen', icon: 'grid' },
  ...ENTIDADES.map((e) => ({ key: e.key as TabKey, label: e.label, icon: e.icon })),
];

function initialsOf(text: string) {
  return text
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('');
}

function validate(form: Registro, campos: Campo[]) {
  const errors: Record<string, string> = {};
  for (const c of campos) {
    const v = (form[c.key] ?? '').trim();
    if (c.required && !v) {
      errors[c.key] = c.type === 'select' ? 'Selecciona una opción.' : 'Este campo es obligatorio.';
    } else if (c.type === 'email' && v && !/^\S+@\S+\.\S+$/.test(v)) {
      errors[c.key] = 'El correo no tiene un formato válido.';
    }
  }
  return errors;
}

// Lista desplegable: muestra 4 opciones a la vez y el resto se desliza dentro.
function DropdownSelect({
  value,
  opciones,
  placeholder,
  onChange,
  invalid,
}: {
  value: string;
  opciones: string[];
  placeholder?: string;
  onChange: (v: string) => void;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        e.stopPropagation();
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={styles.dropdown} ref={ref}>
      <button
        type="button"
        className={`${styles.dropdownBtn} ${invalid ? styles.invalid : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={value ? '' : styles.dropdownPlaceholder}>{value || placeholder || 'Selecciona'}</span>
        <Icon name="chevron" />
      </button>

      {open && (
        <ul className={styles.dropdownList} role="listbox">
          {opciones.map((o) => (
            <li key={o} role="option" aria-selected={o === value}>
              <button
                type="button"
                className={`${styles.dropdownItem} ${o === value ? styles.dropdownItemActive : ''}`}
                onClick={() => {
                  onChange(o);
                  setOpen(false);
                }}
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <label>{label}</label>
      {children}
      {error && <span className={styles.fieldError}>{error}</span>}
    </div>
  );
}

function matches(item: Record<string, string>, q: string, skip: string[]) {
  return Object.entries(item).some(([k, v]) => !skip.includes(k) && v.toLowerCase().includes(q));
}

export default function ExpedientesPage() {
  const [datos, setDatos] = useState<Record<EntityKey, Registro[]>>(
    () => Object.fromEntries(ENTIDADES.map((e) => [e.key, e.seed])) as Record<EntityKey, Registro[]>,
  );
  const [tab, setTab] = useState<TabKey>('resumen');
  const [resumenVista, setResumenVista] = useState<'ocupantes' | 'departamentos'>('ocupantes');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<'ver' | 'editar' | 'eliminar'>('ver');
  const [form, setForm] = useState<Registro>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mensaje, setMensaje] = useState<string | null>(null);

  const esResumen = tab === 'resumen';
  const ent = ENTIDADES.find((e) => e.key === tab) ?? ENTIDADES[0];
  const lista = tab === 'resumen' ? [] : datos[tab];

  // Ocupantes del edificio: copropietarios e inquilinos (sin empleados)
  const ocupantes: Ocupante[] = useMemo(
    () =>
      [
        ...datos.copropietarios.map((c) => ({
          id: `copropietario-${c.id}`,
          tipo: 'Copropietario' as const,
          nombre: c.nombre,
          ci: c.ci,
          correo: c.correo,
          telefono: c.telefono,
          departamento: c.departamento,
          estado: c.estado,
          fecha: c.fecha,
        })),
        ...datos.inquilinos.map((i) => ({
          id: `inquilino-${i.id}`,
          tipo: 'Inquilino' as const,
          nombre: i.nombre,
          ci: i.ci,
          correo: i.correo,
          telefono: i.telefono,
          departamento: i.departamento,
          estado: i.estado,
          fecha: i.fecha,
        })),
      ].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es')),
    [datos],
  );

  const filteredOcupantes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ocupantes;
    return ocupantes.filter((o) => matches(o as unknown as Record<string, string>, q, ['id', 'fecha', 'estado']));
  }, [ocupantes, query]);

  const filteredDeptos = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return datos.departamentos;
    return datos.departamentos.filter((d) => matches(d, q, ['id', 'fecha', 'estado']));
  }, [datos.departamentos, query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || esResumen) return lista;
    return lista.filter((item) => matches(item, q, ['id', 'fecha', 'estado']));
  }, [lista, query, esResumen]);

  const seleccionado = !esResumen ? lista.find((i) => i.id === selectedId) ?? null : null;
  const ocupanteSel = esResumen && resumenVista === 'ocupantes' ? ocupantes.find((o) => o.id === selectedId) ?? null : null;
  const deptoSel =
    esResumen && resumenVista === 'departamentos' ? datos.departamentos.find((d) => d.id === selectedId) ?? null : null;

  const changeTab = (k: TabKey) => {
    setTab(k);
    setSelectedId(null);
    setMode('ver');
    setQuery('');
    setMensaje(null);
  };

  const changeResumenVista = (v: 'ocupantes' | 'departamentos') => {
    setResumenVista(v);
    setSelectedId(null);
    setQuery('');
  };

  const selectItem = (id: string) => {
    setSelectedId(id);
    setMode('ver');
    setErrors({});
    setMensaje(null);
  };

  const closeDetail = () => {
    setSelectedId(null);
    setMode('ver');
    setErrors({});
  };

  const startEdit = () => {
    if (!seleccionado) return;
    setForm({ ...seleccionado });
    setErrors({});
    setMode('editar');
  };

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const saveEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (esResumen) return;
    const found = validate(form, ent.campos);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    const limpio: Registro = { ...form };
    for (const c of ent.campos) {
      limpio[c.key] = (form[c.key] ?? '').trim() || '—';
    }
    setDatos((prev) => ({
      ...prev,
      [tab]: prev[tab as EntityKey].map((r) => (r.id === selectedId ? { ...r, ...limpio } : r)),
    }));
    setMode('ver');
    setErrors({});
    setMensaje(`Los datos de ${limpio[ent.principal]} se actualizaron correctamente.`);
  };

  const confirmDelete = () => {
    if (!seleccionado || esResumen) return;
    const nombre = seleccionado[ent.principal];
    setDatos((prev) => ({
      ...prev,
      [tab]: prev[tab as EntityKey].filter((r) => r.id !== selectedId),
    }));
    setSelectedId(null);
    setMode('ver');
    setMensaje(`${nombre} fue eliminado.`);
  };

  // ---------- Vista de resumen: ocupantes ----------
  const renderResumenOcupante = (o: Ocupante) => {
    const depto = datos.departamentos.find((d) => d.numero === o.departamento);
    const etiqueta = `${o.nombre} (${o.tipo})`;
    const parqueos = datos.parqueos.filter((p) => p.responsable === etiqueta);
    const bauleras = datos.bauleras.filter((b) => b.responsable === etiqueta);
    const vive = o.estado === 'Activo';

    return (
      <>
        <h3 className={styles.sectionTitle}>Datos personales</h3>
        <dl className={styles.dataGrid}>
          <div className={styles.dataItem}>
            <dt>Cédula de identidad (CI)</dt>
            <dd>{o.ci}</dd>
          </div>
          <div className={styles.dataItem}>
            <dt>Correo electrónico</dt>
            <dd>{o.correo}</dd>
          </div>
          <div className={styles.dataItem}>
            <dt>Teléfono</dt>
            <dd>{o.telefono}</dd>
          </div>
          <div className={styles.dataItem}>
            <dt>Estado</dt>
            <dd>{o.estado}</dd>
          </div>
        </dl>

        <h3 className={styles.sectionTitle}>Vivienda</h3>
        <dl className={styles.dataGrid}>
          <div className={styles.dataItem}>
            <dt>Departamento</dt>
            <dd>{o.departamento}</dd>
          </div>
          <div className={styles.dataItem}>
            <dt>Tipo</dt>
            <dd>{depto?.tipo ?? '—'}</dd>
          </div>
          <div className={styles.dataItem}>
            <dt>Piso</dt>
            <dd>{depto?.piso ?? '—'}</dd>
          </div>
          <div className={styles.dataItem}>
            <dt>{o.tipo === 'Copropietario' ? 'Vive en el departamento' : 'Vive en el departamento (alquila)'}</dt>
            <dd>
              <span className={vive ? `${styles.pill} ${styles.pillOk}` : `${styles.pill} ${styles.pillOff}`}>
                {vive ? 'Sí' : 'No'}
              </span>
            </dd>
          </div>
        </dl>

        <h3 className={styles.sectionTitle}>Parqueo y baulera</h3>
        {parqueos.length === 0 && bauleras.length === 0 ? (
          <p className={styles.emptyText}>No tiene parqueo ni baulera registrados.</p>
        ) : (
          <div className={styles.personList}>
            {parqueos.map((p) => (
              <div key={`p-${p.id}`} className={styles.personRow}>
                <span className={styles.avatar}>P</span>
                <div className={styles.personText}>
                  <strong>Parqueo {p.numero}</strong>
                  <small>Departamento {p.departamento}</small>
                </div>
                <span className={p.estado === 'Activo' ? `${styles.pill} ${styles.pillOk}` : `${styles.pill} ${styles.pillOff}`}>
                  {p.estado}
                </span>
              </div>
            ))}
            {bauleras.map((b) => (
              <div key={`b-${b.id}`} className={styles.personRow}>
                <span className={styles.avatar}>B</span>
                <div className={styles.personText}>
                  <strong>Baulera {b.numero}</strong>
                  <small>Departamento {b.departamento}</small>
                </div>
                <span className={b.estado === 'Activo' ? `${styles.pill} ${styles.pillOk}` : `${styles.pill} ${styles.pillOff}`}>
                  {b.estado}
                </span>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  // ---------- Vista de resumen: departamentos ----------
  const renderResumenDepartamento = (d: Registro) => {
    const propietarios = datos.copropietarios.filter((c) => c.departamento === d.numero);
    const inquilinos = datos.inquilinos.filter((i) => i.departamento === d.numero);
    const viven = [
      ...propietarios.filter((c) => c.estado === 'Activo').map((c) => ({ id: `c-${c.id}`, nombre: c.nombre, rol: 'Copropietario' })),
      ...inquilinos.filter((i) => i.estado === 'Activo').map((i) => ({ id: `i-${i.id}`, nombre: i.nombre, rol: 'Inquilino' })),
    ];
    const parqueos = datos.parqueos.filter((p) => p.departamento === d.numero);
    const bauleras = datos.bauleras.filter((b) => b.departamento === d.numero);

    return (
      <>
        <h3 className={styles.sectionTitle}>Propietario</h3>
        {propietarios.length === 0 ? (
          <p className={styles.emptyText}>Sin copropietario registrado.</p>
        ) : (
          <div className={styles.personList}>
            {propietarios.map((c) => (
              <div key={c.id} className={styles.personRow}>
                <span className={styles.avatar}>{initialsOf(c.nombre)}</span>
                <div className={styles.personText}>
                  <strong>{c.nombre}</strong>
                  <small>{c.correo}</small>
                </div>
                <span className={c.estado === 'Activo' ? `${styles.pill} ${styles.pillOk}` : `${styles.pill} ${styles.pillOff}`}>
                  {c.estado === 'Activo' ? 'Vive en el departamento' : 'No vive en el departamento'}
                </span>
              </div>
            ))}
          </div>
        )}

        <h3 className={styles.sectionTitle}>Quiénes viven aquí</h3>
        {viven.length === 0 ? (
          <p className={styles.emptyText}>Nadie vive en este departamento actualmente.</p>
        ) : (
          <div className={styles.personList}>
            {viven.map((p) => (
              <div key={p.id} className={styles.personRow}>
                <span className={styles.avatar}>{initialsOf(p.nombre)}</span>
                <div className={styles.personText}>
                  <strong>{p.nombre}</strong>
                  <small>{p.rol}</small>
                </div>
              </div>
            ))}
          </div>
        )}

        <h3 className={styles.sectionTitle}>Parqueo y baulera</h3>
        {parqueos.length === 0 && bauleras.length === 0 ? (
          <p className={styles.emptyText}>Sin parqueo ni baulera registrados.</p>
        ) : (
          <div className={styles.personList}>
            {parqueos.map((p) => (
              <div key={`p-${p.id}`} className={styles.personRow}>
                <span className={styles.avatar}>P</span>
                <div className={styles.personText}>
                  <strong>Parqueo {p.numero}</strong>
                  <small>{p.responsable}</small>
                </div>
              </div>
            ))}
            {bauleras.map((b) => (
              <div key={`b-${b.id}`} className={styles.personRow}>
                <span className={styles.avatar}>B</span>
                <div className={styles.personText}>
                  <strong>Baulera {b.numero}</strong>
                  <small>{b.responsable}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <AppShell>
      <div className={styles.container}>
        <div className={styles.titleBlock}>
          <span className={styles.eyebrow}>Administración</span>
          <div className={styles.titleRow}>
            <h1>Expedientes</h1>
          </div>
          <p>Consulta un resumen del edificio o edita los datos de cada registro.</p>
        </div>

        <div className={styles.tabs} role="tablist">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
              onClick={() => changeTab(t.key)}
            >
              <Icon name={t.icon} />
              {t.label}
            </button>
          ))}
        </div>

        {esResumen && (
          <div className={styles.tabs} role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={resumenVista === 'ocupantes'}
              className={`${styles.tab} ${resumenVista === 'ocupantes' ? styles.tabActive : ''}`}
              onClick={() => changeResumenVista('ocupantes')}
            >
              <Icon name="users" />
              Resumen de ocupantes
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={resumenVista === 'departamentos'}
              className={`${styles.tab} ${resumenVista === 'departamentos' ? styles.tabActive : ''}`}
              onClick={() => changeResumenVista('departamentos')}
            >
              <Icon name="building" />
              Resumen de departamentos
            </button>
          </div>
        )}

        {mensaje && (
          <div className={styles.banner} role="status">
            <Icon name="check" />
            <span>{mensaje}</span>
          </div>
        )}

        <div className={styles.layout}>
          <section className={styles.listCard}>
            <div className={styles.listHead}>
              <h2>
                {esResumen ? (resumenVista === 'ocupantes' ? 'Ocupantes' : 'Departamentos') : ent.label}
              </h2>
              <span>
                {esResumen
                  ? resumenVista === 'ocupantes'
                    ? `${ocupantes.length} ocupantes`
                    : `${datos.departamentos.length} departamentos`
                  : `${lista.length} registrados`}
              </span>
            </div>

            <label className={styles.searchBox}>
              <Icon name="search" />
              <input
                type="search"
                placeholder={esResumen ? 'Buscar en el resumen' : `Buscar en ${ent.label.toLowerCase()}`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>

            <div className={styles.listScroll}>
              {esResumen && resumenVista === 'ocupantes' &&
                (filteredOcupantes.length === 0 ? (
                  <p className={styles.empty}>No se encontraron ocupantes.</p>
                ) : (
                  filteredOcupantes.map((o) => {
                    const active = o.id === selectedId;
                    return (
                      <button
                        key={o.id}
                        type="button"
                        className={`${styles.listItem} ${active ? styles.listItemActive : ''}`}
                        onClick={() => selectItem(o.id)}
                        aria-current={active ? 'true' : undefined}
                      >
                        <span className={styles.avatar}>{initialsOf(o.nombre)}</span>
                        <span className={styles.listText}>
                          <strong>{o.nombre}</strong>
                          <small>
                            {o.tipo} · {o.departamento}
                          </small>
                        </span>
                      </button>
                    );
                  })
                ))}

              {esResumen && resumenVista === 'departamentos' &&
                (filteredDeptos.length === 0 ? (
                  <p className={styles.empty}>No se encontraron departamentos.</p>
                ) : (
                  filteredDeptos.map((d) => {
                    const active = d.id === selectedId;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        className={`${styles.listItem} ${active ? styles.listItemActive : ''}`}
                        onClick={() => selectItem(d.id)}
                        aria-current={active ? 'true' : undefined}
                      >
                        <span className={styles.avatar}>{initialsOf(d.numero)}</span>
                        <span className={styles.listText}>
                          <strong>{d.numero}</strong>
                          <small>{d.tipo}</small>
                        </span>
                      </button>
                    );
                  })
                ))}

              {!esResumen &&
                (filtered.length === 0 ? (
                  <p className={styles.empty}>No se encontraron registros.</p>
                ) : (
                  filtered.map((item) => {
                    const active = item.id === selectedId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`${styles.listItem} ${active ? styles.listItemActive : ''}`}
                        onClick={() => selectItem(item.id)}
                        aria-current={active ? 'true' : undefined}
                      >
                        <span className={styles.avatar}>{initialsOf(item[ent.principal] ?? '')}</span>
                        <span className={styles.listText}>
                          <strong>{item[ent.principal]}</strong>
                          <small>{ent.sub ? item[ent.sub] : item.estado}</small>
                        </span>
                      </button>
                    );
                  })
                ))}
            </div>
          </section>

          <section className={styles.detailCard}>
            {esResumen ? (
              ocupanteSel || deptoSel ? (
                <>
                  <div className={styles.detailHead}>
                    <div className={styles.detailTitle}>
                      <span className={styles.avatarLg}>
                        {initialsOf(ocupanteSel ? ocupanteSel.nombre : (deptoSel?.numero ?? ''))}
                      </span>
                      <div>
                        <h2>{ocupanteSel ? ocupanteSel.nombre : `Departamento ${deptoSel?.numero}`}</h2>
                        <span className={styles.chip}>
                          {ocupanteSel ? `${ocupanteSel.tipo} · ${ocupanteSel.departamento}` : deptoSel?.tipo}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailActions}>
                      <button type="button" className={styles.closeBtn} aria-label="Cerrar" onClick={closeDetail}>
                        <Icon name="close" />
                      </button>
                    </div>
                  </div>
                  {ocupanteSel
                    ? renderResumenOcupante(ocupanteSel)
                    : deptoSel && renderResumenDepartamento(deptoSel)}
                </>
              ) : (
                <div className={styles.emptyDetail}>
                  <Icon name={resumenVista === 'ocupantes' ? 'users' : 'building'} />
                  <p>
                    {resumenVista === 'ocupantes'
                      ? 'Selecciona un ocupante para ver su información completa.'
                      : 'Selecciona un departamento para ver quién es su dueño y quién vive en él.'}
                  </p>
                </div>
              )
            ) : !seleccionado ? (
              <div className={styles.emptyDetail}>
                <Icon name={ent.icon} />
                <p>Selecciona un registro de la lista para ver y editar sus datos.</p>
              </div>
            ) : (
              <>
                <div className={styles.detailHead}>
                  <div className={styles.detailTitle}>
                    <span className={styles.avatarLg}>{initialsOf(seleccionado[ent.principal] ?? '')}</span>
                    <div>
                      <h2>{seleccionado[ent.principal]}</h2>
                      {ent.sub && <span className={styles.chip}>{seleccionado[ent.sub]}</span>}
                    </div>
                  </div>

                  <div className={styles.detailActions}>
                    {mode !== 'editar' && (
                      <>
                        <button type="button" className={styles.ghostBtn} onClick={startEdit}>
                          <Icon name="edit" />
                          Editar
                        </button>
                        <button
                          type="button"
                          className={styles.dangerBtn}
                          onClick={() => setMode(mode === 'eliminar' ? 'ver' : 'eliminar')}
                        >
                          <Icon name="trash" />
                          Eliminar
                        </button>
                      </>
                    )}
                    <button type="button" className={styles.closeBtn} aria-label="Cerrar" onClick={closeDetail}>
                      <Icon name="close" />
                    </button>
                  </div>
                </div>

                {mode === 'eliminar' && (
                  <div className={styles.confirmBar}>
                    <span>¿Eliminar a {seleccionado[ent.principal]}? Esta acción no se puede deshacer.</span>
                    <div>
                      <button type="button" className={styles.ghostBtn} onClick={() => setMode('ver')}>
                        Cancelar
                      </button>
                      <button type="button" className={styles.dangerBtn} onClick={confirmDelete}>
                        Sí, eliminar
                      </button>
                    </div>
                  </div>
                )}

                {mode === 'editar' ? (
                  <form onSubmit={saveEdit} noValidate>
                    <div className={styles.formGrid}>
                      {ent.campos.map((c) => (
                        <Field key={c.key} label={`${c.label}${c.required ? ' *' : ''}`} error={errors[c.key]}>
                          {c.type === 'select' ? (
                            <DropdownSelect
                              value={form[c.key] ?? ''}
                              opciones={c.opciones ?? []}
                              placeholder={c.placeholder}
                              onChange={(v) => handleChange(c.key, v)}
                              invalid={!!errors[c.key]}
                            />
                          ) : (
                            <input
                              type={c.type ?? 'text'}
                              placeholder={c.placeholder}
                              value={form[c.key] ?? ''}
                              onChange={(e) => handleChange(c.key, e.target.value)}
                              className={errors[c.key] ? styles.invalid : ''}
                              autoComplete="off"
                            />
                          )}
                        </Field>
                      ))}
                    </div>

                    <div className={styles.actions}>
                      <button type="button" className={styles.ghostBtn} onClick={() => setMode('ver')}>
                        Cancelar
                      </button>
                      <button type="submit" className={styles.primaryBtn}>
                        <Icon name="check" />
                        Guardar cambios
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h3 className={styles.sectionTitle}>Datos de registro</h3>
                    <dl className={styles.dataGrid}>
                      {ent.campos.map((c) => (
                        <div key={c.key} className={styles.dataItem}>
                          <dt>{c.label}</dt>
                          <dd>{seleccionado[c.key]}</dd>
                        </div>
                      ))}
                      <div className={styles.dataItem}>
                        <dt>Fecha de registro</dt>
                        <dd>{seleccionado.fecha}</dd>
                      </div>
                    </dl>
                  </>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </AppShell>
  );
}
