import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed para Usuario
  await prisma.usuario.createMany({
    data: [
      { NombreUsuario: 'Luis', ApellidoUsuario: 'Hernández', Telefono: 88012345, Correo: 'luis.hernandez@gmail.com', Contrasena: '$2b$10$jxYl7sNw4oNglMtAM/kq5OybAitQPyDKozIB/wjGvre8cgjwpoWE2' , Rol: "AdminNivel1"},
      { NombreUsuario: 'Ana', ApellidoUsuario: 'Martínez', Telefono: 88123456, Correo: 'ana.martinez@gmail.com', Contrasena: '$2b$10$jxYl7sNw4oNglMtAM/kq5OybAitQPyDKozIB/wjGvre8cgjwpoWE2', Rol: "UsuarioNivel0"},
      { NombreUsuario: 'Carlos', ApellidoUsuario: 'González', Telefono: 88234567, Correo: 'carlos.gonzalez@gmail.com', Contrasena: '$2b$10$jxYl7sNw4oNglMtAM/kq5OybAitQPyDKozIB/wjGvre8cgjwpoWE2', Rol: "UsuarioNivel0" },
      { NombreUsuario: 'María', ApellidoUsuario: 'Rodríguez', Telefono: 88345678, Correo: 'maria.rodriguez@gmail.com', Contrasena: '$2b$10$jxYl7sNw4oNglMtAM/kq5OybAitQPyDKozIB/wjGvre8cgjwpoWE2', Rol: "UsuarioNivel0" },
      { NombreUsuario: 'José', ApellidoUsuario: 'López', Telefono: 88456789, Correo: 'jose.lopez@gmail.com', Contrasena: '$2b$10$jxYl7sNw4oNglMtAM/kq5OybAitQPyDKozIB/wjGvre8cgjwpoWE2' , Rol: "UsuarioNivel0"},
      { NombreUsuario: 'Sofía', ApellidoUsuario: 'Pérez', Telefono: 88567890, Correo: 'sofia.perez@gmail.com', Contrasena: '$2b$10$jxYl7sNw4oNglMtAM/kq5OybAitQPyDKozIB/wjGvre8cgjwpoWE2' , Rol: "UsuarioNivel0"},
      { NombreUsuario: 'David', ApellidoUsuario: 'García', Telefono: 88678901, Correo: 'david.garcia@gmail.com', Contrasena: '$2b$10$jxYl7sNw4oNglMtAM/kq5OybAitQPyDKozIB/wjGvre8cgjwpoWE2' , Rol: "UsuarioNivel0"},
      { NombreUsuario: 'Carmen', ApellidoUsuario: 'Ramírez', Telefono: 88789012, Correo: 'carmen.ramirez@gmail.com', Contrasena: '$2b$10$jxYl7sNw4oNglMtAM/kq5OybAitQPyDKozIB/wjGvre8cgjwpoWE2' , Rol: "UsuarioNivel0"},
      { NombreUsuario: 'Juan', ApellidoUsuario: 'Torres', Telefono: 88890123, Correo: 'juan.torres@gmail.com', Contrasena: '$2b$10$jxYl7sNw4oNglMtAM/kq5OybAitQPyDKozIB/wjGvre8cgjwpoWE2' , Rol: "UsuarioNivel0"},
      { NombreUsuario: 'Isabel', ApellidoUsuario: 'Flores', Telefono: 88901234, Correo: 'isabel.flores@gmail.com', Contrasena: '$2b$10$jxYl7sNw4oNglMtAM/kq5OybAitQPyDKozIB/wjGvre8cgjwpoWE2' , Rol: "UsuarioNivel0"},
      { NombreUsuario: 'Miguel', ApellidoUsuario: 'Vargas', Telefono: 88012346, Correo: 'miguel.vargas@gmail.com', Contrasena: '$2b$10$jxYl7sNw4oNglMtAM/kq5OybAitQPyDKozIB/wjGvre8cgjwpoWE2' , Rol: "UsuarioNivel0"},
      { NombreUsuario: 'Laura', ApellidoUsuario: 'Morales', Telefono: 88123457, Correo: 'laura.morales@gmail.com', Contrasena: '$2b$10$jxYl7sNw4oNglMtAM/kq5OybAitQPyDKozIB/wjGvre8cgjwpoWE2', Rol: "UsuarioNivel0" },
      { NombreUsuario: 'Pedro', ApellidoUsuario: 'Méndez', Telefono: 88234568, Correo: 'pedro.mendez@gmail.com', Contrasena: '$2b$10$jxYl7sNw4oNglMtAM/kq5OybAitQPyDKozIB/wjGvre8cgjwpoWE2' , Rol: "UsuarioNivel0"},
      { NombreUsuario: 'Carolina', ApellidoUsuario: 'Chávez', Telefono: 88345679, Correo: 'carolina.chavez@gmail.com', Contrasena: '$2b$10$jxYl7sNw4oNglMtAM/kq5OybAitQPyDKozIB/wjGvre8cgjwpoWE2' , Rol: "UsuarioNivel0"},
      { NombreUsuario: 'Esteban', ApellidoUsuario: 'Ruiz', Telefono: 88456780, Correo: 'esteban.ruiz@gmail.com', Contrasena: '$2b$10$jxYl7sNw4oNglMtAM/kq5OybAitQPyDKozIB/wjGvre8cgjwpoWE2', Rol: "UsuarioNivel0" }
    ],
  })

  // Seed para Solicitantes
  await prisma.solicitantes.createMany({
    data: [
      { NombreSolicitante: 'Jorge', ApellidoSolicitante: 'Martínez', Telefono: 88567891, Correo: 'jorge.martinez@gmail.com' },
      { NombreSolicitante: 'Cecilia', ApellidoSolicitante: 'Gómez', Telefono: 88678902, Correo: 'cecilia.gomez@gmail.com' },
      { NombreSolicitante: 'Manuel', ApellidoSolicitante: 'Hernández', Telefono: 88789013, Correo: 'manuel.hernandez@gmail.com' },
      { NombreSolicitante: 'Adriana', ApellidoSolicitante: 'Ortiz', Telefono: 88890124, Correo: 'adriana.ortiz@gmail.com' },
      { NombreSolicitante: 'Fernando', ApellidoSolicitante: 'Castillo', Telefono: 88901235, Correo: 'fernando.castillo@gmail.com' },
      { NombreSolicitante: 'Rosa', ApellidoSolicitante: 'Ramírez', Telefono: 88012347, Correo: 'rosa.ramirez@gmail.com' },
      { NombreSolicitante: 'Diego', ApellidoSolicitante: 'Vásquez', Telefono: 88123458, Correo: 'diego.vasquez@gmail.com' },
      { NombreSolicitante: 'Lucía', ApellidoSolicitante: 'Sánchez', Telefono: 88234569, Correo: 'lucia.sanchez@gmail.com' },
      { NombreSolicitante: 'Alejandro', ApellidoSolicitante: 'Molina', Telefono: 88345670, Correo: 'alejandro.molina@gmail.com' },
      { NombreSolicitante: 'Gloria', ApellidoSolicitante: 'Navarro', Telefono: 88456781, Correo: 'gloria.navarro@gmail.com' },
      { NombreSolicitante: 'Héctor', ApellidoSolicitante: 'Campos', Telefono: 88567892, Correo: 'hector.campos@gmail.com' },
      { NombreSolicitante: 'Elena', ApellidoSolicitante: 'Carrillo', Telefono: 88678903, Correo: 'elena.carrillo@gmail.com' },
      { NombreSolicitante: 'Luis', ApellidoSolicitante: 'Guerrero', Telefono: 88789014, Correo: 'luis.guerrero@gmail.com' },
      { NombreSolicitante: 'Patricia', ApellidoSolicitante: 'Cruz', Telefono: 88890125, Correo: 'patricia.cruz@gmail.com' },
      { NombreSolicitante: 'Álvaro', ApellidoSolicitante: 'Ríos', Telefono: 88901236, Correo: 'alvaro.rios@gmail.com' }
    ],
  })
 // Seed para Reservacion
  await prisma.reservacion.createMany({
    data: [
      {
        NumeroReservacion: 1,
        FechaDeReservacion: new Date('2024-05-01'),
        TipoCita: 'MakeUp',
        SolicitanteID: 1,
      },
      {
        NumeroReservacion: 2,
        FechaDeReservacion: new Date('2024-05-02'),
        TipoCita: 'MakeUp',
        SolicitanteID: 2,
      },
      {
        NumeroReservacion: 3,
        FechaDeReservacion: new Date('2024-05-03'),
        TipoCita: 'MakeUp',
        SolicitanteID: 3,
      },
      {
        NumeroReservacion: 4,
        FechaDeReservacion: new Date('2024-05-04'),
        TipoCita: 'MakeUp',
        SolicitanteID: 4,
      },
      {
        NumeroReservacion: 5,
        FechaDeReservacion: new Date('2024-05-05'),
        TipoCita: 'MakeUp',
        SolicitanteID: 5,
      },
      {
        NumeroReservacion: 6,
        FechaDeReservacion: new Date('2024-05-06'),
        TipoCita: 'MakeUp',
        SolicitanteID: 6,
      },
      {
        NumeroReservacion: 7,
        FechaDeReservacion: new Date('2024-05-07'),
        TipoCita: 'MakeUp',
        SolicitanteID: 7,
      },
      {
        NumeroReservacion: 8,
        FechaDeReservacion: new Date('2024-05-08'),
        TipoCita: 'MakeUp',
        SolicitanteID: 8,
      },
      {
        NumeroReservacion: 9,
        FechaDeReservacion: new Date('2024-05-09'),
        TipoCita: 'MakeUp',
        SolicitanteID: 9,
      },
      {
        NumeroReservacion: 10,
        FechaDeReservacion: new Date('2024-05-10'),
        TipoCita: 'MakeUp',
        SolicitanteID: 10,
      },
      {
        NumeroReservacion: 11,
        FechaDeReservacion: new Date('2024-05-11'),
        TipoCita: 'MakeUp',
        SolicitanteID: 11,
      },
      {
        NumeroReservacion: 12,
        FechaDeReservacion: new Date('2024-05-12'),
        TipoCita: 'MakeUp',
        SolicitanteID: 12,
      },
      {
        NumeroReservacion: 13,
        FechaDeReservacion: new Date('2024-05-13'),
        TipoCita: 'MakeUp',
        SolicitanteID: 13,
      },
      {
        NumeroReservacion: 14,
        FechaDeReservacion: new Date('2024-05-14'),
        TipoCita: 'MakeUp',
        SolicitanteID: 14,
      },
      {
        NumeroReservacion: 15,
        FechaDeReservacion: new Date('2024-05-15'),
        TipoCita: 'MakeUp',
        SolicitanteID: 15,
      },
    ],
  })
 // Seed para Facturas
  await prisma.factura.createMany({
  data: [
    {
      FacturaID: 1,
      FechaDeCreacion: new Date('2024-05-01'),
      TipoCita: 'MakeUp',
      Subtotal: 100,
      Total: 120,
      SolicitanteID: 1,
    },
    {
      FacturaID: 2,
      FechaDeCreacion: new Date('2024-05-02'),
      TipoCita: 'MakeUp',
      Subtotal: 80,
      Total: 96,
      SolicitanteID: 2,
    },
    {
      FacturaID: 3,
      FechaDeCreacion: new Date('2024-05-03'),
      TipoCita: 'MakeUp',
      Subtotal: 120,
      Total: 144,
      SolicitanteID: 3,
    },
    {
      FacturaID: 4,
      FechaDeCreacion: new Date('2024-05-04'),
      TipoCita: 'MakeUp',
      Subtotal: 110,
      Total: 132,
      SolicitanteID: 4,
    },
    {
      FacturaID: 5,
      FechaDeCreacion: new Date('2024-05-05'),
      TipoCita: 'MakeUp',
      Subtotal: 90,
      Total: 108,
      SolicitanteID: 5,
    },
    {
      FacturaID: 6,
      FechaDeCreacion: new Date('2024-05-06'),
      TipoCita: 'MakeUp',
      Subtotal: 130,
      Total: 156,
      SolicitanteID: 6,
    },
    {
      FacturaID: 7,
      FechaDeCreacion: new Date('2024-05-07'),
      TipoCita: 'MakeUp',
      Subtotal: 140,
      Total: 168,
      SolicitanteID: 7,
    },
    {
      FacturaID: 8,
      FechaDeCreacion: new Date('2024-05-08'),
      TipoCita: 'MakeUp',
      Subtotal: 100,
      Total: 120,
      SolicitanteID: 8,
    },
    {
      FacturaID: 9,
      FechaDeCreacion: new Date('2024-05-09'),
      TipoCita: 'MakeUp',
      Subtotal: 120,
      Total: 144,
      SolicitanteID: 9,
    },
    {
      FacturaID: 10,
      FechaDeCreacion: new Date('2024-05-10'),
      TipoCita: 'MakeUp',
      Subtotal: 110,
      Total: 132,
      SolicitanteID: 10,
    },
    {
      FacturaID: 11,
      FechaDeCreacion: new Date('2024-05-11'),
      TipoCita: 'MakeUp',
      Subtotal: 90,
      Total: 108,
      SolicitanteID: 11,
    },
    {
      FacturaID: 12,
      FechaDeCreacion: new Date('2024-05-12'),
      TipoCita: 'MakeUp',
      Subtotal: 130,
      Total: 156,
      SolicitanteID: 12,
    },
    {
      FacturaID: 13,
      FechaDeCreacion: new Date('2024-05-13'),
      TipoCita: 'MakeUp',
      Subtotal: 100,
      Total: 120,
      SolicitanteID: 13,
    },
    {
      FacturaID: 14,
      FechaDeCreacion: new Date('2024-05-14'),
      TipoCita: 'MakeUp',
      Subtotal: 80,
      Total: 96,
      SolicitanteID: 14,
    },
    {
      FacturaID: 15,
      FechaDeCreacion: new Date('2024-05-15'),
      TipoCita: 'MakeUp',
      Subtotal: 120,
      Total: 144,
      SolicitanteID: 15,
    },
  ],
})
 // Seed para Auditorias
 await prisma.auditoria.createMany({
  data: [
    { DescripcionDeAccion: 'Creación de usuario', FechaDeModificacion: new Date('2024-07-20T10:00:00Z'), FechaDeCreacion: new Date('2024-07-20T10:00:00Z'), ActualizadoEn: new Date('2024-07-20T10:00:00Z') },
    { DescripcionDeAccion: 'Actualización de perfil', FechaDeModificacion: new Date('2024-07-19T15:30:00Z'), FechaDeCreacion: new Date('2024-07-19T15:30:00Z'), ActualizadoEn: new Date('2024-07-19T15:30:00Z') },
    { DescripcionDeAccion: 'Eliminación de archivo', FechaDeModificacion: new Date('2024-07-18T12:45:00Z'), FechaDeCreacion: new Date('2024-07-18T12:45:00Z'), ActualizadoEn: new Date('2024-07-18T12:45:00Z') },
    { DescripcionDeAccion: 'Cambio de contraseña', FechaDeModificacion: new Date('2024-07-17T09:15:00Z'), FechaDeCreacion: new Date('2024-07-17T09:15:00Z'), ActualizadoEn: new Date('2024-07-17T09:15:00Z') },
    { DescripcionDeAccion: 'Creación de nuevo proyecto', FechaDeModificacion: new Date('2024-07-16T14:20:00Z'), FechaDeCreacion: new Date('2024-07-16T14:20:00Z'), ActualizadoEn: new Date('2024-07-16T14:20:00Z') },
    { DescripcionDeAccion: 'Actualización de configuración', FechaDeModificacion: new Date('2024-07-15T11:30:00Z'), FechaDeCreacion: new Date('2024-07-15T11:30:00Z'), ActualizadoEn: new Date('2024-07-15T11:30:00Z') },
    { DescripcionDeAccion: 'Eliminación de comentario', FechaDeModificacion: new Date('2024-07-14T16:10:00Z'), FechaDeCreacion: new Date('2024-07-14T16:10:00Z'), ActualizadoEn: new Date('2024-07-14T16:10:00Z') },
    { DescripcionDeAccion: 'Cambio de permisos de usuario', FechaDeModificacion: new Date('2024-07-13T08:50:00Z'), FechaDeCreacion: new Date('2024-07-13T08:50:00Z'), ActualizadoEn: new Date('2024-07-13T08:50:00Z') },
    { DescripcionDeAccion: 'Creación de reporte mensual', FechaDeModificacion: new Date('2024-07-12T13:25:00Z'), FechaDeCreacion: new Date('2024-07-12T13:25:00Z'), ActualizadoEn: new Date('2024-07-12T13:25:00Z') },
    { DescripcionDeAccion: 'Actualización de documento', FechaDeModificacion: new Date('2024-07-11T17:40:00Z'), FechaDeCreacion: new Date('2024-07-11T17:40:00Z'), ActualizadoEn: new Date('2024-07-11T17:40:00Z') },
    { DescripcionDeAccion: 'Eliminación de tarea pendiente', FechaDeModificacion: new Date('2024-07-10T10:55:00Z'), FechaDeCreacion: new Date('2024-07-10T10:55:00Z'), ActualizadoEn: new Date('2024-07-10T10:55:00Z') },
    { DescripcionDeAccion: 'Cambio de estado de pedido', FechaDeModificacion: new Date('2024-07-09T15:00:00Z'), FechaDeCreacion: new Date('2024-07-09T15:00:00Z'), ActualizadoEn: new Date('2024-07-09T15:00:00Z') },
    { DescripcionDeAccion: 'Creación de nueva oferta', FechaDeModificacion: new Date('2024-07-08T09:20:00Z'), FechaDeCreacion: new Date('2024-07-08T09:20:00Z'), ActualizadoEn: new Date('2024-07-08T09:20:00Z') },
    { DescripcionDeAccion: 'Actualización de política interna', FechaDeModificacion: new Date('2024-07-07T11:45:00Z'), FechaDeCreacion: new Date('2024-07-07T11:45:00Z'), ActualizadoEn: new Date('2024-07-07T11:45:00Z') },
    { DescripcionDeAccion: 'Eliminación de registro obsoleto', FechaDeModificacion: new Date('2024-07-06T14:00:00Z'), FechaDeCreacion: new Date('2024-07-06T14:00:00Z'), ActualizadoEn: new Date('2024-07-06T14:00:00Z') },
  ],
})
}

  main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

