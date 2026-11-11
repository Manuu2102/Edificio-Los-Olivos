import RegistroPage, { type RegistroConfig } from '../_components/registro/RegistroPage';

// Departamentos disponibles en el edificio: 1A, 1B, 2A, 2B, ... hasta el piso 6.
const DEPARTAMENTOS = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'];

const CONFIG: RegistroConfig = {
  eyebrow: 'Administración',
  titulo: 'Inquilinos',
  entidad: 'inquilino',
  historial: 'Historial de inquilinos',
  descripcionHistorial: 'Todos los inquilinos registrados en el edificio',
  campos: [
    { key: 'nombre', label: 'Nombre completo', placeholder: 'Ej. Ana', required: true },
    { key: 'apellido', label: 'Apellido completo', placeholder: 'Ej. Lara Vargas', required: true },
    { key: 'ci', label: 'Cédula de identidad (CI)', placeholder: 'Ej. 7412583 LP', required: true },
    {
      key: 'departamento',
      label: 'Departamento que alquila',
      placeholder: 'Selecciona un departamento',
      type: 'select',
      opciones: DEPARTAMENTOS,
      required: true,
    },
    { key: 'correo', label: 'Correo electrónico', placeholder: 'correo@ejemplo.com', type: 'email', required: true },
    { key: 'telefono', label: 'Teléfono', placeholder: '+591 7XX XXXXX', type: 'tel' },
  ],
  columnas: [
    { key: 'nombre', label: 'Inquilino' },
    { key: 'ci', label: 'CI' },
    { key: 'departamento', label: 'Departamento' },
    { key: 'telefono', label: 'Teléfono' },
  ],
  subKey: 'correo',
  resumen: true,
  registros: [
    { id: '1', nombre: 'Lucía Paredes Gutiérrez', ci: '6125478 LP', departamento: '1B', telefono: '+591 744 11223', correo: 'lucia.paredes@mail.com', fecha: '05/02/2025', estado: 'Activo' },
    { id: '2', nombre: 'Diego Romero Villca', ci: '5873316 CB', departamento: '3A', telefono: '+591 755 67890', correo: 'diego.romero@mail.com', fecha: '19/09/2025', estado: 'Activo' },
    { id: '3', nombre: 'Patricia Ríos Aguilar', ci: '4590217 SC', departamento: '2A', telefono: '—', correo: 'pat.rios@mail.com', fecha: '03/04/2026', estado: 'Inactivo' },
  ],
};

export default function InquilinosPage() {
  return <RegistroPage config={CONFIG} />;
}
