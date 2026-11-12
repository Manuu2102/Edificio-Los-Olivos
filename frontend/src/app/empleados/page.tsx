import RegistroPage, { type RegistroConfig } from '../_components/registro/RegistroPage';

const CONFIG: RegistroConfig = {
  clave: 'empleados',
  eyebrow: 'Administración',
  titulo: 'Empleados',
  entidad: 'empleado',
  historial: 'Historial de empleados',
  descripcionHistorial: 'Todos los empleados registrados en el edificio',
  campos: [
    { key: 'nombre', label: 'Nombre completo', placeholder: 'Ej. Roberto', required: true },
    { key: 'apellido', label: 'Apellido completo', placeholder: 'Ej. Gálvez Ticona', required: true },
    { key: 'ci', label: 'Cédula de identidad (CI)', placeholder: 'Ej. 5102938 LP', required: true },
    { key: 'cargo', label: 'Cargo', placeholder: 'Ej. Portero', required: true },
    { key: 'horario', label: 'Horario', placeholder: 'Ej. 07:00 - 15:00' },
    { key: 'telefono', label: 'Teléfono', placeholder: '+591 7XX XXXXX', type: 'tel' },
  ],
  columnas: [
    { key: 'nombre', label: 'Empleado' },
    { key: 'ci', label: 'CI' },
    { key: 'cargo', label: 'Cargo' },
    { key: 'horario', label: 'Horario' },
    { key: 'telefono', label: 'Teléfono' },
  ],
  resumen: true,
};

export default function EmpleadosPage() {
  return <RegistroPage config={CONFIG} />;
}
