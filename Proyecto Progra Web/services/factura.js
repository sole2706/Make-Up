const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Facturas {

  constructor() {

  };

  async Agregar(Factura) {
    let resultado;
    try {
      resultado = await prisma.factura.create({
        data: {
          FechaDeCreacion: Factura.FechaDeCreacion || new Date(),
          TipoCita: Factura.TipoCita || 'MakeUp',
          Subtotal: parseInt(Factura.Subtotal),
          Total: parseInt(Factura.Total),
          SolicitanteID: parseInt(Factura.SolicitanteID),
        }
      });
      let auditoria;
      auditoria = await prisma.auditoria.create({
        data: {
          DescripcionDeAccion: `Se creo la Factura:` + Factura.FacturaID,
        },
      });
      console.log(auditoria);
    } catch (error) {
      console.error(`No se pudo insertar la factura debido al error: ${error}`);
    }
    return resultado;
  };

  async Actualizar(FacturaID, Factura) {
    let resultado;
    try {
      resultado = await prisma.factura.update({
        where: { FacturaID: parseInt(FacturaID) },
        data: {
          FechaDeCreacion: Factura.FechaDeCreacion,
          TipoCita: Factura.TipoCita,
          Subtotal: parseInt(Factura.Subtotal),
          Total: parseInt(Factura.Total),
          SolicitanteID: Factura.SolicitanteID,
        },
      });
      let auditoria;
      auditoria = await prisma.auditoria.create({
        data: {
          DescripcionDeAccion: `Se modifico la Factura:` + Factura.FacturaID,
        },
      });
      console.log(auditoria);
    } catch (error) {
      console.error(`No se pudo actualizar la factura ${FacturaID} debido al error: ${error}`);
    }
    return resultado;
  };


  async Borrar(FacturaID) {
  
      let resultado;
      try {
        // Verificar si la factura existe
        const factura = await prisma.factura.findUnique({
          where: {
            FacturaID: parseInt(FacturaID),
          },
        });
    
        if (!factura) {
          throw new Error(`Factura con ID ${FacturaID} no encontrada`);
        }
    
        // Eliminar la factura
        resultado = await prisma.factura.delete({
          where: {
            FacturaID: parseInt(FacturaID),
          },
        });
        let auditoria;
        auditoria = await prisma.auditoria.create({
          data: {
            DescripcionDeAccion: `Se borro la Factura:` + FacturaID,
          },
        });
        console.log(auditoria);
      } catch (error) {
        console.error(`No se pudo borrar la factura ${FacturaID} debido al error: ${error}`);
      }
      return resultado;
    };
  

  

  Listar(FacturaID) {
    let Facturas;
    if (FacturaID === undefined) {
      Facturas = prisma.factura.findMany();
    } else {
      Facturas = prisma.factura.findMany({
        where: {
          FacturaID: parseInt(FacturaID),
        },
      });
    }
    return Facturas;
  };
}

module.exports = Facturas;
