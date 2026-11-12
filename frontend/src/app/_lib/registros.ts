// Almacén compartido de registros.
// Copropietarios, Inquilinos, Departamentos, Empleados, Parqueos, Bauleras y Expedientes
// leen y escriben aquí, así los cambios se ven en todas las pantallas.
// Los datos viven en memoria: se reinician al recargar la página.
import { useSyncExternalStore } from 'react';

export type Entidad =
  | 'copropietarios'
  | 'inquilinos'
  | 'departamentos'
  | 'empleados'
  | 'parqueos'
  | 'bauleras';

// Cada registro es un objeto de textos. Siempre incluye id, fecha y estado.
export type Registro = Record<string, string>;

export const DEPARTAMENTOS = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'];

// Datos de ejemplo. Reemplázalos por los datos de tu API cuando la tengas.
const SEEDS: Record<Entidad, Registro[]> = {
  copropietarios: [
  {
    id: '1',
    nombre: 'Carlos Mendoza Rojas',
    ci: '5214786 LP',
    correo: 'carlos.mendoza@mail.com',
    telefono: '+591 711 22334',
    departamento: '1A',
    fecha: '12/03/2025',
    estado: 'Activo',
  },
  {
    id: '2',
    nombre: 'María Fernanda Soliz',
    ci: '6638120 CB',
    correo: 'mfsoliz@mail.com',
    telefono: '+591 722 45678',
    departamento: '2B',
    fecha: '28/07/2025',
    estado: 'Activo',
  },
  {
    id: '3',
    nombre: 'Javier Arce Quispe',
    ci: '4870321 SC',
    correo: 'javier.arce@mail.com',
    telefono: '+591 733 98765',
    departamento: '3A',
    fecha: '15/01/2026',
    estado: 'Inactivo',
  },
  ],
  inquilinos: [
    { id: '1', nombre: 'Lucía Paredes Gutiérrez', ci: '6125478 LP', departamento: '1B', telefono: '+591 744 11223', correo: 'lucia.paredes@mail.com', fecha: '05/02/2025', estado: 'Activo' },
    { id: '2', nombre: 'Diego Romero Villca', ci: '5873316 CB', departamento: '3A', telefono: '+591 755 67890', correo: 'diego.romero@mail.com', fecha: '19/09/2025', estado: 'Activo' },
    { id: '3', nombre: 'Patricia Ríos Aguilar', ci: '4590217 SC', departamento: '2A', telefono: '—', correo: 'pat.rios@mail.com', fecha: '03/04/2026', estado: 'Inactivo' },
  ],
  departamentos: [
    { id: '1', numero: 'Depto. 101', piso: '1', tipo: '2 dormitorios', fecha: '12/03/2025', estado: 'Activo' },
    { id: '2', numero: 'Depto. 204', piso: '2', tipo: '3 dormitorios', fecha: '28/07/2025', estado: 'Activo' },
    { id: '3', numero: 'Depto. 305', piso: '3', tipo: 'Monoambiente', fecha: '15/01/2026', estado: 'Inactivo' },
  ],
  empleados: [
    { id: '1', nombre: 'Roberto Gálvez Ticona', ci: '5102938 LP', cargo: 'Portero', horario: '07:00 - 15:00', telefono: '+591 766 10101', fecha: '03/02/2025', estado: 'Activo' },
    { id: '2', nombre: 'Lidia Condori Mamani', ci: '6207741 CB', cargo: 'Limpieza', horario: '08:00 - 12:00', telefono: '+591 777 20202', fecha: '20/08/2025', estado: 'Activo' },
    { id: '3', nombre: 'Éver Vargas Limachi', ci: '4983310 SC', cargo: 'Mantenimiento', horario: '13:00 - 19:00', telefono: '—', fecha: '11/04/2026', estado: 'Inactivo' },
  ],
  parqueos: [
    { id: '1', numero: 'P-12', ubicacion: 'Subsuelo 1', departamento: 'Depto. 101', responsable: 'Carlos Mendoza Rojas', fecha: '12/03/2025', estado: 'Activo' },
    { id: '2', numero: 'P-07', ubicacion: 'Subsuelo 1', departamento: 'Depto. 204', responsable: 'María Fernanda Soliz', fecha: '28/07/2025', estado: 'Activo' },
    { id: '3', numero: 'P-21', ubicacion: 'Subsuelo 2', departamento: 'Depto. 305', responsable: 'Javier Arce Quispe', fecha: '15/01/2026', estado: 'Inactivo' },
  ],
  bauleras: [
    { id: '1', numero: 'B-03', ubicacion: 'Subsuelo 2', departamento: 'Depto. 101', responsable: 'Carlos Mendoza Rojas', tamano: '3.5', fecha: '12/03/2025', estado: 'Activo' },
    { id: '2', numero: 'B-11', ubicacion: 'Subsuelo 2', departamento: 'Depto. 305', responsable: 'Javier Arce Quispe', tamano: '4.0', fecha: '15/01/2026', estado: 'Activo' },
    { id: '3', numero: 'B-07', ubicacion: 'Subsuelo 1', departamento: 'Depto. 204', responsable: 'María Fernanda Soliz', tamano: '2.8', fecha: '28/07/2025', estado: 'Inactivo' },
  ],
};

let state: Record<Entidad, Registro[]> = SEEDS;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function addRecord(entidad: Entidad, registro: Registro) {
  state = { ...state, [entidad]: [registro, ...state[entidad]] };
  emit();
}

export function updateRecord(entidad: Entidad, id: string, cambios: Registro) {
  state = {
    ...state,
    [entidad]: state[entidad].map((r) => (r.id === id ? { ...r, ...cambios } : r)),
  };
  emit();
}

export function removeRecord(entidad: Entidad, id: string) {
  state = { ...state, [entidad]: state[entidad].filter((r) => r.id !== id) };
  emit();
}

export function useRecords(entidad: Entidad): Registro[] {
  const getSnapshot = () => state[entidad];
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
