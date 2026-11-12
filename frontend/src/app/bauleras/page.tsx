import RegistroPage, { type RegistroConfig } from '../_components/registro/RegistroPage';

const CONFIG: RegistroConfig = {
  clave: 'bauleras',
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
};

export default function BaulerasPage() {
  return <RegistroPage config={CONFIG} />;
}
