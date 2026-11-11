import RegistroPage, { type RegistroConfig } from '../_components/registro/RegistroPage';

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
    { key: 'departamento', label: 'Departamento que alquila', placeholder: 'Ej. Depto. 102', required: true },
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
  registros: [
    { id: '1', nombre: 'Lucía Paredes Gutiérrez', ci: '6125478 LP', departamento: 'Depto. 102', telefono: '+591 744 11223', correo: 'lucia.paredes@mail.com', fecha: '05/02/2025', estado: 'Activo' },
    { id: '2', nombre: 'Diego Romero Villca', ci: '5873316 CB', departamento: 'Depto. 303', telefono: '+591 755 67890', correo: 'diego.romero@mail.com', fecha: '19/09/2025', estado: 'Activo' },
    { id: '3', nombre: 'Patricia Ríos Aguilar', ci: '4590217 SC', departamento: 'Depto. 201', telefono: '—', correo: 'pat.rios@mail.com', fecha: '03/04/2026', estado: 'Inactivo' },
  ],
};

export default function InquilinosPage() {
  return <RegistroPage config={CONFIG} />;
}
