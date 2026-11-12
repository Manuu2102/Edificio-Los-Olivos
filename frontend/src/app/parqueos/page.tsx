import RegistroPage, { type Registro, type RegistroConfig } from '../_components/registro/RegistroPage';

const RESPONSABLES = [
  'Carlos Mendoza Rojas (Copropietario)',
  'María Fernanda Soliz (Copropietario)',
  'Javier Arce Quispe (Copropietario)',
  'Lucía Paredes Gutiérrez (Inquilino)',
  'Diego Romero Villca (Inquilino)',
  'Patricia Ríos Aguilar (Inquilino)',
];

const SEED: Registro[] = [
    { id: '1', numero: 'P-12', departamento: '1A', responsable: 'Carlos Mendoza Rojas (Copropietario)', fecha: '12/03/2025', estado: 'Activo' },
    { id: '2', numero: 'P-07', departamento: '2B', responsable: 'María Fernanda Soliz (Copropietario)', fecha: '28/07/2025', estado: 'Activo' },
    { id: '3', numero: 'P-21', departamento: '3A', responsable: 'Javier Arce Quispe (Copropietario)', fecha: '15/01/2026', estado: 'Inactivo' },
];

const DEPARTAMENTOS = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'];

const CONFIG: RegistroConfig = {
  eyebrow: 'Administración',
  titulo: 'Parqueos',
  entidad: 'parqueo',
  historial: 'Historial de parqueos',
  descripcionHistorial: 'Todos los parqueos registrados en el edificio',
  campos: [
    { key: 'numero', label: 'Número de parqueo', placeholder: 'Ej. P-12', required: true },
    {
      key: 'departamento',
      label: 'Departamento asignado',
      placeholder: 'Selecciona un departamento',
      type: 'select',
      opciones: DEPARTAMENTOS,
      required: true,
    },
    {
      key: 'responsable',
      label: 'Propietario o inquilino responsable',
      placeholder: 'Selecciona un responsable',
      type: 'select',
      opciones: RESPONSABLES,
      required: true,
    },
  ],
  columnas: [
    { key: 'numero', label: 'Parqueo' },
    { key: 'departamento', label: 'Departamento' },
    { key: 'responsable', label: 'Responsable' },
  ],
  resumen: true,
  registros: SEED,
};

export default function ParqueosPage() {
  return <RegistroPage config={CONFIG} />;
}
