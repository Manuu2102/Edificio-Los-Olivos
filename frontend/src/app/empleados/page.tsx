import RegistroPage, { type RegistroConfig } from '../_components/registro/RegistroPage';

const CONFIG: RegistroConfig = {
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
  registros: [
    { id: '1', nombre: 'Roberto Gálvez Ticona', ci: '5102938 LP', cargo: 'Portero', horario: '07:00 - 15:00', telefono: '+591 766 10101', fecha: '03/02/2025', estado: 'Activo' },
    { id: '2', nombre: 'Lidia Condori Mamani', ci: '6207741 CB', cargo: 'Limpieza', horario: '08:00 - 12:00', telefono: '+591 777 20202', fecha: '20/08/2025', estado: 'Activo' },
    { id: '3', nombre: 'Éver Vargas Limachi', ci: '4983310 SC', cargo: 'Mantenimiento', horario: '13:00 - 19:00', telefono: '—', fecha: '11/04/2026', estado: 'Inactivo' },
  ],
};

export default function EmpleadosPage() {
  return <RegistroPage config={CONFIG} />;
}
