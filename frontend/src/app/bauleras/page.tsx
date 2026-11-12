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
    { id: '1', numero: 'B-03', departamento: 'Depto. 101', responsable: 'Carlos Mendoza Rojas (Copropietario)', fecha: '12/03/2025', estado: 'Activo' },
    { id: '2', numero: 'B-11', departamento: 'Depto. 305', responsable: 'Javier Arce Quispe (Copropietario)', fecha: '15/01/2026', estado: 'Activo' },
    { id: '3', numero: 'B-07', departamento: 'Depto. 204', responsable: 'María Fernanda Soliz (Copropietario)', fecha: '28/07/2025', estado: 'Inactivo' },
];

const CONFIG: RegistroConfig = {
  eyebrow: 'Administración',
  titulo: 'Bauleras',
  entidad: 'baulera',
  historial: 'Historial de bauleras',
  descripcionHistorial: 'Todas las bauleras registradas en el edificio',
  campos: [
    { key: 'numero', label: 'Número de baulera', placeholder: 'Ej. B-07', required: true },
    { key: 'departamento', label: 'Departamento asignado', placeholder: 'Ej. Depto. 101', required: true },
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
    { key: 'numero', label: 'Baulera' },
    { key: 'departamento', label: 'Departamento' },
    { key: 'responsable', label: 'Responsable' },
  ],
  resumen: true,
  registros: SEED,
};

export default function BaulerasPage() {
  return <RegistroPage config={CONFIG} />;
}
