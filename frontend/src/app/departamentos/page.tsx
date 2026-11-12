import RegistroPage, { type Registro, type RegistroConfig } from '../_components/registro/RegistroPage';

const SEED: Registro[] = [
    { id: '1', numero: 'Depto. 101', piso: '1', tipo: 'Departamento tipo A', fecha: '12/03/2025', estado: 'Activo' },
    { id: '2', numero: 'Depto. 204', piso: '2', tipo: 'Departamento tipo B', fecha: '28/07/2025', estado: 'Activo' },
    { id: '3', numero: 'Depto. 305', piso: '3', tipo: 'Departamento tipo C', fecha: '15/01/2026', estado: 'Inactivo' },
];

// Tipos de departamento disponibles.
const TIPOS = ['Departamento tipo A', 'Departamento tipo B', 'Departamento tipo C'];

const CONFIG: RegistroConfig = {
  registros: SEED,
  eyebrow: 'Administración',
  titulo: 'Departamentos',
  entidad: 'departamento',
  historial: 'Historial de departamentos',
  descripcionHistorial: 'Todos los departamentos registrados en el edificio',
  campos: [
    { key: 'numero', label: 'Número de departamento', placeholder: 'Ej. Depto. 101', required: true },
    { key: 'piso', label: 'Piso', placeholder: 'Ej. 1', required: true },
    {
      key: 'tipo',
      label: 'Tipo',
      placeholder: 'Selecciona un tipo',
      type: 'select',
      opciones: TIPOS,
      required: true,
    },
  ],
  columnas: [
    { key: 'numero', label: 'Departamento' },
    { key: 'piso', label: 'Piso' },
    { key: 'tipo', label: 'Tipo' },
  ],
  resumen: true,
};

export default function DepartamentosPage() {
  return <RegistroPage config={CONFIG} />;
}
