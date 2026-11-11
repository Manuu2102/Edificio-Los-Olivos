import RegistroPage, { type RegistroConfig } from '../_components/registro/RegistroPage';

const CONFIG: RegistroConfig = {
  eyebrow: 'Administración',
  titulo: 'Parqueos',
  entidad: 'parqueo',
  historial: 'Historial de parqueos',
  descripcionHistorial: 'Todos los parqueos registrados en el edificio',
  campos: [
    { key: 'numero', label: 'Número de parqueo', placeholder: 'Ej. P-12', required: true },
    { key: 'ubicacion', label: 'Ubicación', placeholder: 'Ej. Subsuelo 1', required: true },
    { key: 'departamento', label: 'Departamento asignado', placeholder: 'Ej. Depto. 101', required: true },
    { key: 'responsable', label: 'Propietario o inquilino responsable', placeholder: 'Nombre completo', required: true },
  ],
  columnas: [
    { key: 'numero', label: 'Parqueo' },
    { key: 'ubicacion', label: 'Ubicación' },
    { key: 'departamento', label: 'Departamento' },
    { key: 'responsable', label: 'Responsable' },
  ],
  registros: [
    { id: '1', numero: 'P-12', ubicacion: 'Subsuelo 1', departamento: 'Depto. 101', responsable: 'Carlos Mendoza Rojas', fecha: '12/03/2025', estado: 'Activo' },
    { id: '2', numero: 'P-07', ubicacion: 'Subsuelo 1', departamento: 'Depto. 204', responsable: 'María Fernanda Soliz', fecha: '28/07/2025', estado: 'Activo' },
    { id: '3', numero: 'P-21', ubicacion: 'Subsuelo 2', departamento: 'Depto. 305', responsable: 'Javier Arce Quispe', fecha: '15/01/2026', estado: 'Inactivo' },
  ],
};

export default function ParqueosPage() {
  return <RegistroPage config={CONFIG} />;
}
