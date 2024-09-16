const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Reservaciones {

  constructor() {

  };

  async Agregar(Reservacion) {
    let resultado;
    try {
      resultado = await prisma.reservacion.create({
        data: {
          FechaDeReservacion: Reservacion.FechaDeReservacion || new Date(),
          TipoCita: Reservacion.TipoCita,
          SolicitanteID: parseInt(Reservacion.SolicitanteID)
        }
      });
      let auditoria;
      auditoria = await prisma.auditoria.create({
        data: {
          DescripcionDeAccion: `Se creo la reservacion:` + Reservacion.NumeroReservacion + "Tipo Reservacion:" + Reservacion.TipoCita,
        },
      });
      console.log(auditoria);
    } catch (error) {
      console.error(`No se pudo insertar la reservación debido al error: ${error}`);
    }
    return resultado;
  };

  async Actualizar(NumeroReservacion, Reservacion) {
    let resultado;
    try {
      resultado = await prisma.reservacion.update({
        where: { NumeroReservacion: parseInt(NumeroReservacion) },
        data: {
          FechaDeReservacion: Reservacion.FechaDeReservacion,
          TipoCita: Reservacion.TipoCita,
          SolicitanteID: Reservacion.SolicitanteID,
        },
      });
      let auditoria;
      auditoria = await prisma.auditoria.create({
        data: {
          DescripcionDeAccion: `Se modifico la reservacion:` + NumeroReservacion + "Tipo Reservacion:" + Reservacion.TipoCita,
        },
      });
      console.log(auditoria);
    } catch (error) {
      console.error(`No se pudo actualizar la reservación ${NumeroReservacion} debido al error: ${error}`);
    }
    return resultado;
  };

  async Borrar(NumeroReservacion) {
    let resultado;
    try {
      resultado = await prisma.reservacion.delete({
        where: {
          NumeroReservacion: parseInt(NumeroReservacion),
        },
      });
      let auditoria;
      auditoria = await prisma.auditoria.create({
        data: {
          DescripcionDeAccion: `Se borro la reservacion:` + NumeroReservacion,
        },
      });
      console.log(auditoria);
    } catch (error) {
      console.error(`No se pudo borrar la reservación ${NumeroReservacion} debido al error: ${error}`);
    }
    return resultado;
  };

  Listar(NumeroReservacion) {
    let Reservaciones;
    if (NumeroReservacion === undefined) {
      Reservaciones = prisma.reservacion.findMany();
    } else {
      Reservaciones = prisma.reservacion.findMany({
        where: {
          NumeroReservacion: parseInt(NumeroReservacion),
        },
      });
    }
    return Reservaciones;
  };
}

module.exports = Reservaciones;
