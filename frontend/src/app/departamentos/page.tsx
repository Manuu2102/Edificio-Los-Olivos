import RegistroPage, { type RegistroConfig } from '../_components/registro/RegistroPage';

const CONFIG: RegistroConfig = {
  clave: 'departamentos',
  eyebrow: 'Administración',
  titulo: 'Departamentos',
  entidad: 'departamento',
  historial: 'Historial de departamentos',
  descripcionHistorial: 'Todos los departamentos registrados en el edificio',
  campos: [
    { key: 'numero', label: 'Número de departamento', placeholder: 'Ej. Depto. 101', required: true },
    { key: 'piso', label: 'Piso', placeholder: 'Ej. 1', required: true },
    { key: 'tipo', label: 'Tipo', placeholder: 'Ej. 2 dormitorios', required: true },
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
