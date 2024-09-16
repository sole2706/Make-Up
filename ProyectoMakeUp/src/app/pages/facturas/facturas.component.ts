// import { Component, signal } from '@angular/core';
// import {Facturas, TipoCitaEnum} from '../../model/facturas';
// import {JsonPipe} from '@angular/common';

// @Component({
//   selector: 'app-facturas',
//   standalone: true,
//   imports: [JsonPipe],
//   templateUrl: './facturas.component.html',
//   styleUrl: './facturas.component.css'
// })
// export class FacturasComponent {
//   public Titulo = 'Administracion de Facturas';
//   public Facturas = signal<Facturas[]>([
//    {
//     FacturaID: 1,
//     FechaDeCreacion: new Date(),
//     TipoCita: TipoCitaEnum.Tipo1,
//     Subtotal: 100,
//     Total: 115,
//     SolicitanteID: 123
//    }
//   ]);
// }

import { Component, signal } from '@angular/core';
import { Facturas } from '../../model/facturas';
import { formatDate, JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {jsPDF} from 'jspdf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Facturas',
  standalone: true,
  imports: [JsonPipe, FormsModule],
  templateUrl: './Facturas.component.html',
  styleUrl: './Facturas.component.css'
})
export class FacturasComponent {

  public Titulo = 'Administración de Facturas';
  public Facturas = signal<Facturas[]>([]);
  
  public FacturaID?:       number =0;         
  public FechaDeCreacion?: Date = new Date;   
  public TipoCita?:        string ="";     
  public Subtotal?:        number=0;
  public Total?:       number=0;
  public SolicitanteID?:   number=1;


  constructor(private http: HttpClient,private router: Router) {
    if (!this.validaAcceso()) {
      this.router.navigate(['']);
    }
    this.metodoGETFacturas();
  };
  recargarPagina() {
    window.location.reload();
  }
  public validaAcceso() {
    if (String(localStorage.getItem('Rol')) === "AdminNivel1") {
      return true;
    }
    return false;
  };
  public metodoGETFacturas() {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });
    let cuerpo = {};
    this.http.post('http://localhost/factura/listar', cuerpo, {headers: encabezados})
    .subscribe((Facturas) => {
      const arr = Facturas as Facturas[];
      arr.forEach((Facturas) => {
        if (Facturas.FacturaID) {
        this.agregarFacturasALaSenial(Facturas.FacturaID
          , Facturas.FechaDeCreacion, Facturas.TipoCita, Facturas.Subtotal, Facturas.Total
          , Facturas.SolicitanteID);
      
    }if (Facturas.Token) {
      localStorage.setItem('Token', String(Facturas.Token));
    }
  });
});
};

  agregarHabilitado: boolean = true;
  public agregarFacturas(event:  Event) {
    let tag = event.target as HTMLInputElement;
    let cuerpo = {
      FechaDeCreacion: this.FechaDeCreacion,
      TipoCita: this.TipoCita,
      Subtotal: this.Subtotal,
      Total: this.Total,
      SolicitanteID: this.SolicitanteID,
   
    };
    //console.log('Datos a enviar:', cuerpo);

    this.http.post('http://localhost/factura', cuerpo).subscribe(() => {
      // const nuevaProvincia = Provincia as Provincia;
      this.Facturas.update((Facturas) => [...Facturas, cuerpo]);
    });
     window.location.reload();
     this.limpiar();
  };


  public agregarFacturasALaSenial(FacturaID?: number
    , FechaDeCreacion?: Date
    , TipoCita?: string
    ,Subtotal?: number,
     Total?: number
   , SolicitanteID?: number) {
    let nuevaFacturas = {
      FacturaID: FacturaID,
      FechaDeCreacion: FechaDeCreacion ,
      TipoCita: TipoCita,
      Subtotal: Subtotal,
      Total: Total,
      SolicitanteID: SolicitanteID,

    };
    this.Facturas.update((Facturas) => [...Facturas, nuevaFacturas]);
  };


  public modificarFacturas(ID: any, event:  Event) {
    let tag = event.target as HTMLInputElement;
    let cuerpo = {
      FechaDeCreacion: this.FechaDeCreacion,
      TipoCita: this.TipoCita,
      Subtotal: this.Subtotal,
      Total: this.Total,
      SolicitanteID: this.SolicitanteID,
   
    };
    //console.log('Datos a enviar:', cuerpo);
    this.http.put('http://localhost/factura/'+ ID, cuerpo).subscribe(() => {
      
      this.Facturas.update((Facturas) => {
        return Facturas.map((Facturas) => {
          if (Facturas.FacturaID === ID) {
            return { ...Facturas, ...cuerpo };
          }
          return Facturas;
        });
      });
      
    });
    this.limpiar();
  };
  private facturaData?: Facturas; 
  public encontrarFactura(ID: any){
  this.http.get('http://localhost/factura/' + ID)
    .subscribe((Facturas) => {
    const arr = Facturas as Facturas[];
    arr.forEach((Facturas) => {
        this.FacturaID = Facturas.FacturaID;
        this.FechaDeCreacion = Facturas.FechaDeCreacion;
        this.TipoCita = Facturas.TipoCita;
        this.Subtotal= Facturas.Subtotal;
        this.Total= Facturas.Total
        this.SolicitanteID = Facturas.SolicitanteID;
       
      });

     
   })

    this.agregarHabilitado = false;
  };


  public borrarFacturas(ID: any) {
    console.log(ID);
    this.http.delete('http://localhost/factura/'+ID).subscribe(() => {
      this.Facturas.update((Facturas) => Facturas.filter((Facturas) => Facturas.FacturaID !== ID));
    });
  };
  public limpiar(): void {
    this.FechaDeCreacion = new Date();
    this.TipoCita = "";
    this.Subtotal = 0;
    this.Total = 0;
    this.SolicitanteID = 1;
    this.agregarHabilitado = true;
}
public actualizarTotal(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const tipoSeleccionado = selectElement.value; // e.g., "Manicure"

  // Asignar el valor monetario basado en el tipo de cita seleccionado
  let valorMonetario: number;

  switch (tipoSeleccionado) {
    case 'Manicure':
      valorMonetario = 15000;
      break;
    case 'Pedicure':
      valorMonetario = 22000;
      break;
    case 'Pestanas':
      valorMonetario = 10000;
      break;
    case 'MakeUp':
      valorMonetario = 40000;
      break;
    case 'Extensiones':
      valorMonetario = 12000;
      break;
    case 'LisadoCabello':
      valorMonetario = 60000;
      break;
    case 'TinteCabello':
      valorMonetario = 35000;
      break;
    default:
      valorMonetario = 0; // Valor por defecto si no hay coincidencia
      break;
  }

  // Actualizar el total con el valor monetario
  this.Subtotal = valorMonetario;

  this.Total = (this.Subtotal*0.13)+this.Subtotal;


}
/*public GuardarPDF (){
const doc = new jsPDF();

    const appointments = [
      { date: "2024-08-15", time: "10:00 AM", client: "Cliente 1" },
      { date: "2024-08-16", time: "11:00 AM", client: "Cliente 2" },
      { date: "2024-08-17", time: "02:00 PM", client: "Cliente 3" },
    ];

    // Encabezado
    doc.setFontSize(16);
    doc.text("Calendarización de Citas", 10, 10);
    doc.setFontSize(12);
    doc.text("Fecha: " + new Date().toLocaleDateString(), 10, 20);

    // Tabla de citas
    let startY = 30;
    appointments.forEach((appointment, index) => {
        if (startY > 280) { // Si la página está llena, crear una nueva
            doc.addPage();
            startY = 20;
        }
        doc.text('Cita ${appointment.TipoCita}', 10, startY);
        doc.text('Fecha: ${appointment.FechaDeCreacion}', 10, startY + 10);
        doc.text('Hora: ${appointment.time}', 10, startY + 20);
        doc.text('Cliente: ${appointment.SolicitanteID}', 10, startY + 30);
        startY += 40;
    });

    // Guardar el documento
    doc.save("calendarizacion.pdf");
  }
  
}*/
public encontrarFacturaPDF(ID: any) {
  this.http.get('http://localhost/factura/' + ID)
    .subscribe((Facturas) => { 
      const arr = Facturas as Facturas[];
    arr.forEach((Facturas) =>{
        
        this.facturaData = {
          FacturaID: Facturas.FacturaID,
          FechaDeCreacion: Facturas.FechaDeCreacion,
          TipoCita: Facturas.TipoCita,
          Subtotal: Facturas.Subtotal,
          Total: Facturas.Total,
          SolicitanteID: Facturas.SolicitanteID
        };
        
        // Llama a GuardarPDF si es necesario
        this.GuardarPDF();
    });
});
  
}

GuardarPDF(): void {
  if (!this.facturaData) {
    console.error('No factura data available');
    return;
  }

  const doc = new jsPDF();
  const empresaNombre = "MakeUp";
  
 

  // Nombre de la empresa
  doc.setFontSize(80);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0); // Rojo
  doc.text(empresaNombre, 40, 30); // Ajusta la posición según sea necesario

  // Encabezado
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0); // Rojo
  doc.text("Factura Detalles", 10, 40); // Ajusta la posición para que no se superponga con la imagen

  // Configura el estilo para el resto del texto
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0); // Negro

  // Función para manejar valores que pueden ser undefined
  const safeText = (text: string | Date | number | undefined): string => {
    if (text === undefined) return 'No disponible';
    if (text instanceof Date) return text.toLocaleDateString(); // Convierte Date a string
    return text.toString(); // Para el caso de string ya existente
  };

  // Añade los datos de la factura con estilo
  const labels = [
    { title: "Fecha de Creación:", value: this.facturaData.FechaDeCreacion },
    { title: "Factura ID:", value: this.facturaData.FacturaID },
    { title: "Subtotal:", value: this.facturaData.Subtotal },
    { title: "Total:", value: this.facturaData.Total },
    { title: "Solicitante ID:", value: this.facturaData.SolicitanteID }
  ];

  let y = 50; // Ajusta la posición para que los datos no se superpongan con el encabezado
  labels.forEach(({ title, value }) => {
    doc.setTextColor(255, 0, 0); // Rojo para los títulos
    doc.text(title, 10, y);
    doc.setTextColor(0, 0, 0); // Negro para los valores
    doc.text(safeText(value), 60, y);
    y += 10; // Espacio entre líneas
  });

  // Añade una línea horizontal para mejorar la separación visual
  doc.setDrawColor(255, 0, 0); // Color rojo
  doc.setLineWidth(0.5);
  doc.line(10, y + 5, 200, y + 5); // Línea horizontal

  // Opcional: Añadir la fecha actual al pie del documento
  const today = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0); // Negro
  doc.text("Fecha de impresión: " + today, 10, 285);

  // Guarda el documento PDF
  doc.save("factura.pdf");
}
}






