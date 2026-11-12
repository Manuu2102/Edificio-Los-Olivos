import RegistroPage, { type RegistroConfig } from '../_components/registro/RegistroPage';

const CONFIG: RegistroConfig = {
  eyebrow: 'Administración',
  titulo: 'Bauleras',
  entidad: 'baulera',
  historial: 'Historial de bauleras',
  descripcionHistorial: 'Todas las bauleras registradas en el edificio',
  campos: [
    { key: 'numero', label: 'Número de baulera', placeholder: 'Ej. B-07', required: true },
    { key: 'ubicacion', label: 'Ubicación', placeholder: 'Ej. Subsuelo 2', required: true },
    { key: 'departamento', label: 'Departamento asignado', placeholder: 'Ej. Depto. 204', required: true },
    { key: 'responsable', label: 'Propietario o inquilino responsable', placeholder: 'Nombre completo', required: true },
    { key: 'tamano', label: 'Tamaño (m²)', placeholder: 'Ej. 3.5' },
  ],
  columnas: [
    { key: 'numero', label: 'Baulera' },
    { key: 'ubicacion', label: 'Ubicación' },
    { key: 'departamento', label: 'Departamento' },
    { key: 'responsable', label: 'Responsable' },
    { key: 'tamano', label: 'Tamaño (m²)' },
  ],
  resumen: true,
  registros: [
    { id: '1', numero: 'B-03', ubicacion: 'Subsuelo 2', departamento: 'Depto. 101', responsable: 'Carlos Mendoza Rojas', tamano: '3.5', fecha: '12/03/2025', estado: 'Activo' },
    { id: '2', numero: 'B-11', ubicacion: 'Subsuelo 2', departamento: 'Depto. 305', responsable: 'Javier Arce Quispe', tamano: '4.0', fecha: '15/01/2026', estado: 'Activo' },
    { id: '3', numero: 'B-07', ubicacion: 'Subsuelo 1', departamento: 'Depto. 204', responsable: 'María Fernanda Soliz', tamano: '2.8', fecha: '28/07/2025', estado: 'Inactivo' },
  ],
};

export default function BaulerasPage() {
  return <RegistroPage config={CONFIG} />;
}
