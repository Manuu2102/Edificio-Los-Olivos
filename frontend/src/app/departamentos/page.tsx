import RegistroPage, { type RegistroConfig } from '../_components/registro/RegistroPage';

const CONFIG: RegistroConfig = {
  eyebrow: 'Administración',
  titulo: 'Departamentos',
  entidad: 'departamento',
  historial: 'Historial de departamentos',
  descripcionHistorial: 'Todos los departamentos registrados en el edificio',
  campos: [
    { key: 'numero', label: 'Número de departamento', placeholder: 'Ej. Depto. 101', required: true },
    { key: 'piso', label: 'Piso', placeholder: 'Ej. 1', required: true },
    { key: 'tipo', label: 'Tipo', placeholder: 'Ej. 2 dormitorios', required: true },
    { key: 'superficie', label: 'Superficie (m²)', placeholder: 'Ej. 68' },
    { key: 'propietario', label: 'Propietario', placeholder: 'Nombre completo', required: true },
  ],
  columnas: [
    { key: 'numero', label: 'Departamento' },
    { key: 'piso', label: 'Piso' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'superficie', label: 'Superficie (m²)' },
    { key: 'propietario', label: 'Propietario' },
  ],
  registros: [
    { id: '1', numero: 'Depto. 101', piso: '1', tipo: '2 dormitorios', superficie: '68', propietario: 'Carlos Mendoza Rojas', fecha: '12/03/2025', estado: 'Activo' },
    { id: '2', numero: 'Depto. 204', piso: '2', tipo: '3 dormitorios', superficie: '92', propietario: 'María Fernanda Soliz', fecha: '28/07/2025', estado: 'Activo' },
    { id: '3', numero: 'Depto. 305', piso: '3', tipo: 'Monoambiente', superficie: '38', propietario: 'Javier Arce Quispe', fecha: '15/01/2026', estado: 'Inactivo' },
  ],
};

export default function DepartamentosPage() {
  return <RegistroPage config={CONFIG} />;
}
