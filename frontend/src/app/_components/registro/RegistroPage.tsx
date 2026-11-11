'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import AppShell from '../app-shell/AppShell';
import styles from './registro.module.css';

type IconName = 'plus' | 'search' | 'close' | 'check' | 'chevron' | 'users';

const ICON_PATHS: Record<IconName, string[]> = {
  plus: ['M12 5v14', 'M5 12h14'],
  search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.35-4.35'],
  close: ['M6 6l12 12', 'M18 6L6 18'],
  check: ['M20 6L9 17l-5-5'],
  chevron: ['M6 9l6 6 6-6'],
  users: [
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
    'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
    'M22 21v-2a4 4 0 0 0-3-3.87',
    'M16 3.13a4 4 0 0 1 0 7.75',
  ],
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

// Un registro es un objeto con textos. Siempre incluye id, fecha y estado.
export type Registro = Record<string, string>;

export type Campo = {
  key: string;
  label: string;
  placeholder: string;
  type?: 'text' | 'email' | 'tel' | 'select';
  // Opciones cuando type es 'select'
  opciones?: string[];
  required?: boolean;
};

export type Columna = { key: string; label: string };

export type RegistroConfig = {
  eyebrow: string;
  titulo: string;
  entidad: string; // singular en minúscula, p. ej. "inquilino"
  historial: string;
  descripcionHistorial: string;
  campos: Campo[];
  // La primera columna es la principal (lleva avatar). "Registro" y "Estado" se agregan solas.
  columnas: Columna[];
  // Dato secundario que se muestra debajo del nombre principal (opcional).
  subKey?: string;
  // Muestra las tarjetas de total y de activos/inactivos encima del historial
  resumen?: boolean;
  registros: Registro[];
};

function initialsOf(text: string) {
  return text
    .split(/[\s-]+/)
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

function validate(form: Record<string, string>, campos: Campo[]) {
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

export default function RegistroPage({ config }: { config: RegistroConfig }) {
  const { eyebrow, titulo, entidad, historial, descripcionHistorial, campos, columnas, subKey } = config;
  const principal = columnas[0].key;

  const emptyForm = useMemo(
    () => Object.fromEntries(campos.map((c) => [c.key, ''])) as Record<string, string>,
    [campos],
  );

  const [items, setItems] = useState<Registro[]>(config.registros);
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Record<string, string>>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
      Object.entries(item).some(
        ([k, v]) => !['id', 'fecha', 'estado'].includes(k) && v.toLowerCase().includes(q),
      ),
    );
  }, [items, query]);

  const activos = items.filter((i) => i.estado === 'Activo').length;
  const inactivos = items.length - activos;

  const openForm = () => {
    setForm(emptyForm);
    setErrors({});
    setShowForm(true);
  };

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(form, campos);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    const nuevo: Registro = { id: String(Date.now()), fecha: todayLabel(), estado: 'Activo' };
    for (const c of campos) {
      nuevo[c.key] = (form[c.key] ?? '').trim() || '—';
    }
    // Si el formulario tiene apellido, se une al nombre (igual que en copropietarios).
    if ('apellido' in form && principal === 'nombre') {
      nuevo.nombre = `${form.nombre.trim()} ${form.apellido.trim()}`;
    }

    setItems((prev) => [nuevo, ...prev]);
    setLastRegistered(nuevo[principal]);
    setShowForm(false);
    setForm(emptyForm);
    setErrors({});
  };

  return (
    <AppShell>
      <div className={styles.container}>
        <div className={styles.titleBlock}>
          <span className={styles.eyebrow}>{eyebrow}</span>

          <div className={styles.titleRow}>
            <h1>{titulo}</h1>
            <button type="button" className={styles.primaryBtn} onClick={openForm}>
              <Icon name="plus" />
              Registrar {entidad}
            </button>
          </div>

          <p>
            {items.length} registrados · {activos} activos
          </p>
        </div>

        {config.resumen && (
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>
                <Icon name="users" />
              </span>
              <div>
                <strong>{items.length}</strong>
                <small>{titulo} registrados</small>
              </div>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>
                <Icon name="check" />
              </span>
              <div>
                <strong>{activos}</strong>
                <small>Activos</small>
              </div>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>
                <Icon name="close" />
              </span>
              <div>
                <strong>{inactivos}</strong>
                <small>Inactivos</small>
              </div>
            </div>
          </div>
        )}

        {lastRegistered && (
          <div className={styles.banner} role="status">
            <Icon name="check" />
            <span>{lastRegistered} fue registrado correctamente.</span>
          </div>
        )}

        <section className={styles.historyCard}>
          <div className={styles.historyHead}>
            <div>
              <h2>{historial}</h2>
              <p>{descripcionHistorial}</p>
            </div>

            <label className={styles.searchBox}>
              <Icon name="search" />
              <input
                type="search"
                placeholder="Buscar en el historial"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>

          {filtered.length === 0 ? (
            <p className={styles.empty}>No se encontraron registros con esa búsqueda.</p>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {columnas.map((col) => (
                      <th key={col.key}>{col.label}</th>
                    ))}
                    <th>Registro</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id}>
                      {columnas.map((col, idx) => (
                        <td key={col.key} data-label={col.label}>
                          {idx === 0 ? (
                            <div className={styles.person}>
                              <span className={styles.avatar}>{initialsOf(item[col.key] ?? '')}</span>
                              <div>
                                <strong>{item[col.key]}</strong>
                                {subKey && <small>{item[subKey]}</small>}
                              </div>
                            </div>
                          ) : (
                            item[col.key]
                          )}
                        </td>
                      ))}
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
                <h2 id="modal-title">Registrar {entidad}</h2>
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
              {campos.map((c) => (
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
  placeholder: string;
  onChange: (v: string) => void;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Cerrar al hacer clic fuera o con Escape (sin cerrar también el formulario)
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
        <span className={value ? '' : styles.dropdownPlaceholder}>{value || placeholder}</span>
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
