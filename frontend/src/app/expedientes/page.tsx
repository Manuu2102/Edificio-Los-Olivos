'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import AppShell from '../_components/app-shell/AppShell';
import styles from './expedientes.module.css';

type IconName =
  | 'users'
  | 'home'
  | 'briefcase'
  | 'building'
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
const ESTADOS = ['Activo', 'Inactivo'];

type EntityKey = 'copropietarios' | 'inquilinos' | 'empleados' | 'departamentos';
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
      { key: 'numero', label: 'Número de departamento', required: true, placeholder: 'Ej. Depto. 101' },
      { key: 'piso', label: 'Piso', required: true, placeholder: 'Ej. 1' },
      { key: 'tipo', label: 'Tipo', required: true, placeholder: 'Ej. 2 dormitorios' },
      ESTADO_CAMPO,
    ],
    seed: [
      { id: '1', numero: 'Depto. 101', piso: '1', tipo: '2 dormitorios', fecha: '12/03/2025', estado: 'Activo' },
      { id: '2', numero: 'Depto. 204', piso: '2', tipo: '3 dormitorios', fecha: '28/07/2025', estado: 'Activo' },
      { id: '3', numero: 'Depto. 305', piso: '3', tipo: 'Monoambiente', fecha: '15/01/2026', estado: 'Inactivo' },
    ],
  },
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

export default function ExpedientesPage() {
  const [datos, setDatos] = useState<Record<EntityKey, Registro[]>>(
    () => Object.fromEntries(ENTIDADES.map((e) => [e.key, e.seed])) as Record<EntityKey, Registro[]>,
  );
  const [tab, setTab] = useState<EntityKey>('copropietarios');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<'ver' | 'editar' | 'eliminar'>('ver');
  const [form, setForm] = useState<Registro>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mensaje, setMensaje] = useState<string | null>(null);

  const entidad = ENTIDADES.find((e) => e.key === tab) as Entidad;
  const lista = datos[tab];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return lista;
    return lista.filter((item) =>
      Object.entries(item).some(([k, v]) => !['id', 'fecha', 'estado'].includes(k) && v.toLowerCase().includes(q)),
    );
  }, [lista, query]);

  const seleccionado = lista.find((i) => i.id === selectedId) ?? null;

  const changeTab = (k: EntityKey) => {
    setTab(k);
    setSelectedId(null);
    setMode('ver');
    setQuery('');
    setMensaje(null);
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
    const found = validate(form, entidad.campos);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    const limpio: Registro = { ...form };
    for (const c of entidad.campos) {
      limpio[c.key] = (form[c.key] ?? '').trim() || '—';
    }
    setDatos((prev) => ({
      ...prev,
      [tab]: prev[tab].map((r) => (r.id === selectedId ? { ...r, ...limpio } : r)),
    }));
    setMode('ver');
    setErrors({});
    setMensaje(`Los datos de ${limpio[entidad.principal]} se actualizaron correctamente.`);
  };

  const confirmDelete = () => {
    if (!seleccionado) return;
    const nombre = seleccionado[entidad.principal];
    setDatos((prev) => ({ ...prev, [tab]: prev[tab].filter((r) => r.id !== selectedId) }));
    setSelectedId(null);
    setMode('ver');
    setMensaje(`${nombre} fue eliminado.`);
  };

  return (
    <AppShell>
      <div className={styles.container}>
        <div className={styles.titleBlock}>
          <span className={styles.eyebrow}>Administración</span>
          <div className={styles.titleRow}>
            <h1>Expedientes</h1>
          </div>
          <p>Consulta y edita los datos de copropietarios, inquilinos, empleados y departamentos.</p>
        </div>

        <div className={styles.tabs} role="tablist">
          {ENTIDADES.map((e) => (
            <button
              key={e.key}
              type="button"
              role="tab"
              aria-selected={tab === e.key}
              className={`${styles.tab} ${tab === e.key ? styles.tabActive : ''}`}
              onClick={() => changeTab(e.key)}
            >
              <Icon name={e.icon} />
              {e.label}
            </button>
          ))}
        </div>

        {mensaje && (
          <div className={styles.banner} role="status">
            <Icon name="check" />
            <span>{mensaje}</span>
          </div>
        )}

        <div className={styles.layout}>
          <section className={styles.listCard}>
            <div className={styles.listHead}>
              <h2>{entidad.label}</h2>
              <span>{lista.length} registrados</span>
            </div>

            <label className={styles.searchBox}>
              <Icon name="search" />
              <input
                type="search"
                placeholder={`Buscar en ${entidad.label.toLowerCase()}`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>

            <div className={styles.listScroll}>
              {filtered.length === 0 ? (
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
                      <span className={styles.avatar}>{initialsOf(item[entidad.principal] ?? '')}</span>
                      <span className={styles.listText}>
                        <strong>{item[entidad.principal]}</strong>
                        <small>{entidad.sub ? item[entidad.sub] : item.estado}</small>
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </section>

          <section className={styles.detailCard}>
            {!seleccionado ? (
              <div className={styles.emptyDetail}>
                <Icon name={entidad.icon} />
                <p>Selecciona un registro de la lista para ver y editar sus datos.</p>
              </div>
            ) : (
              <>
                <div className={styles.detailHead}>
                  <div className={styles.detailTitle}>
                    <span className={styles.avatarLg}>{initialsOf(seleccionado[entidad.principal] ?? '')}</span>
                    <div>
                      <h2>{seleccionado[entidad.principal]}</h2>
                      {entidad.sub && <span className={styles.chip}>{seleccionado[entidad.sub]}</span>}
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
                    <span>¿Eliminar a {seleccionado[entidad.principal]}? Esta acción no se puede deshacer.</span>
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
                      {entidad.campos.map((c) => (
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
                      {entidad.campos.map((c) => (
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
