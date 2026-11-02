'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import AppShell from '../_components/app-shell/AppShell';
import styles from './copropietarios.module.css';

type IconName = 'users' | 'plus' | 'search' | 'back' | 'close' | 'check';

const ICON_PATHS: Record<IconName, string[]> = {
  users: [
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
    'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
    'M22 21v-2a4 4 0 0 0-3-3.87',
    'M16 3.13a4 4 0 0 1 0 7.75',
  ],
  plus: ['M12 5v14', 'M5 12h14'],
  search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.35-4.35'],
  back: ['M19 12H5', 'M12 19l-7-7 7-7'],
  close: ['M6 6l12 12', 'M18 6L6 18'],
  check: ['M20 6L9 17l-5-5'],
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

type Copropietario = {
  id: number;
  nombre: string;
  ci: string;
  correo: string;
  telefono: string;
  departamento: string;
  fecha: string;
  estado: 'Activo' | 'Inactivo';
};

type FormState = {
  nombre: string;
  apellido: string;
  ci: string;
  correo: string;
  telefono: string;
  departamento: string;
};

const EMPTY_FORM: FormState = {
  nombre: '',
  apellido: '',
  ci: '',
  correo: '',
  telefono: '',
  departamento: '',
};

// Datos de ejemplo. Reemplázalos por los datos de tu API cuando la tengas.
const SEED: Copropietario[] = [
  {
    id: 1,
    nombre: 'Carlos Mendoza Rojas',
    ci: '5214786 LP',
    correo: 'carlos.mendoza@mail.com',
    telefono: '+591 711 22334',
    departamento: 'Depto. 101',
    fecha: '12/03/2025',
    estado: 'Activo',
  },
  {
    id: 2,
    nombre: 'María Fernanda Soliz',
    ci: '6638120 CB',
    correo: 'mfsoliz@mail.com',
    telefono: '+591 722 45678',
    departamento: 'Depto. 204',
    fecha: '28/07/2025',
    estado: 'Activo',
  },
  {
    id: 3,
    nombre: 'Javier Arce Quispe',
    ci: '4870321 SC',
    correo: 'javier.arce@mail.com',
    telefono: '+591 733 98765',
    departamento: 'Depto. 305',
    fecha: '15/01/2026',
    estado: 'Inactivo',
  },
];

function initialsOf(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('');
}

function todayLabel() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!form.nombre.trim()) errors.nombre = 'Ingresa el nombre.';
  if (!form.apellido.trim()) errors.apellido = 'Ingresa el apellido.';
  if (!form.ci.trim()) errors.ci = 'Ingresa la cédula de identidad.';
  if (!form.departamento.trim()) errors.departamento = 'Ingresa el departamento.';
  if (!form.correo.trim()) {
    errors.correo = 'Ingresa el correo electrónico.';
  } else if (!/^\S+@\S+\.\S+$/.test(form.correo.trim())) {
    errors.correo = 'El correo no tiene un formato válido.';
  }
  return errors;
}

export default function CopropietariosPage() {
  const [items, setItems] = useState<Copropietario[]>(SEED);
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [lastRegistered, setLastRegistered] = useState<string | null>(null);

  // Cerrar el formulario con la tecla Escape
  useEffect(() => {
    if (!showForm) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowForm(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showForm]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      [item.nombre, item.ci, item.departamento, item.correo].some((v) => v.toLowerCase().includes(q)),
    );
  }, [items, query]);

  const activos = items.filter((i) => i.estado === 'Activo').length;

  const openForm = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setShowForm(true);
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(form);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    const nombreCompleto = `${form.nombre.trim()} ${form.apellido.trim()}`;

    const nuevo: Copropietario = {
      id: Date.now(),
      nombre: nombreCompleto,
      ci: form.ci.trim(),
      correo: form.correo.trim(),
      telefono: form.telefono.trim() || '—',
      departamento: form.departamento.trim(),
      fecha: todayLabel(),
      estado: 'Activo',
    };

    setItems((prev) => [nuevo, ...prev]);
    setLastRegistered(nuevo.nombre);
    setShowForm(false);
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const registerButton = (
    <button type="button" className={styles.primaryBtn} onClick={openForm}>
      <Icon name="plus" />
      Registrar copropietario
    </button>
  );

  return (
    <AppShell>
      <div className={styles.container}>
        <div className={styles.titleBlock}>
          <span className={styles.eyebrow}>Administración</span>

          <div className={styles.titleRow}>
            <h1>Copropietarios</h1>
            {registerButton}
          </div>

          <p>
            {items.length} registrados · {activos} activos
          </p>
        </div>

        {lastRegistered && (
          <div className={styles.banner} role="status">
            <Icon name="check" />
            <span>{lastRegistered} fue registrado correctamente.</span>
          </div>
        )}

        <section className={styles.historyCard}>
          <div className={styles.historyHead}>
            <div>
              <h2>Historial de copropietarios</h2>
              <p>Todos los copropietarios registrados en el edificio</p>
            </div>

            <label className={styles.searchBox}>
              <Icon name="search" />
              <input
                type="search"
                placeholder="Buscar por nombre, CI o departamento"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>

          {filtered.length === 0 ? (
            <p className={styles.empty}>No se encontraron copropietarios con esa búsqueda.</p>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Copropietario</th>
                    <th>CI</th>
                    <th>Departamento</th>
                    <th>Teléfono</th>
                    <th>Registro</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id}>
                      <td data-label="Copropietario">
                        <div className={styles.person}>
                          <span className={styles.avatar}>{initialsOf(item.nombre)}</span>
                          <div>
                            <strong>{item.nombre}</strong>
                            <small>{item.correo}</small>
                          </div>
                        </div>
                      </td>
                      <td data-label="CI">{item.ci}</td>
                      <td data-label="Departamento">{item.departamento}</td>
                      <td data-label="Teléfono">{item.telefono}</td>
                      <td data-label="Registro">{item.fecha}</td>
                      <td data-label="Estado">
                        <span className={item.estado === 'Activo' ? styles.badgeOk : styles.badgeOff}>
                          {item.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {showForm && (
        <div className={styles.overlay} onClick={() => setShowForm(false)}>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHead}>
              <div>
                <h2 id="modal-title">Registrar copropietario</h2>
                <p>Completa los datos. Los campos con * son obligatorios.</p>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                aria-label="Cerrar"
                onClick={() => setShowForm(false)}
              >
                <Icon name="close" />
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate className={styles.form}>
              <Field label="Nombre completo *" error={errors.nombre}>
                <input
                  type="text"
                  placeholder="Ej. Carlos"
                  value={form.nombre}
                  onChange={(e) => handleChange('nombre', e.target.value)}
                  className={errors.nombre ? styles.invalid : ''}
                  autoComplete="off"
                />
              </Field>

              <Field label="Apellido completo *" error={errors.apellido}>
                <input
                  type="text"
                  placeholder="Ej. Mendoza Rojas"
                  value={form.apellido}
                  onChange={(e) => handleChange('apellido', e.target.value)}
                  className={errors.apellido ? styles.invalid : ''}
                  autoComplete="off"
                />
              </Field>

              <Field label="Cédula de identidad (CI) *" error={errors.ci}>
                <input
                  type="text"
                  placeholder="Ej. 5214786 LP"
                  value={form.ci}
                  onChange={(e) => handleChange('ci', e.target.value)}
                  className={errors.ci ? styles.invalid : ''}
                />
              </Field>

              <Field label="Departamento *" error={errors.departamento}>
                <input
                  type="text"
                  placeholder="Ej. Depto. 101"
                  value={form.departamento}
                  onChange={(e) => handleChange('departamento', e.target.value)}
                  className={errors.departamento ? styles.invalid : ''}
                />
              </Field>

              <Field label="Correo electrónico *" error={errors.correo}>
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={form.correo}
                  onChange={(e) => handleChange('correo', e.target.value)}
                  className={errors.correo ? styles.invalid : ''}
                />
              </Field>

              <Field label="Teléfono" error={errors.telefono}>
                <input
                  type="tel"
                  placeholder="+591 7XX XXXXX"
                  value={form.telefono}
                  onChange={(e) => handleChange('telefono', e.target.value)}
                />
              </Field>

              <div className={styles.actions}>
                <button type="button" className={styles.ghostBtn} onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
                <button type="submit" className={styles.primaryBtn}>
                  <Icon name="check" />
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function Field({
  label,
  error,
  full,
  children,
}: {
  label: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.field} ${full ? styles.full : ''}`}>
      <label>{label}</label>
      {children}
      {error && <span className={styles.fieldError}>{error}</span>}
    </div>
  );
}
