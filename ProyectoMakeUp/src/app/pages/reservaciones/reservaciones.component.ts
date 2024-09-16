// import { Component, signal } from '@angular/core';
// import {Reservaciones} from '../../model/reservaciones';
// import {TipoCita} from'../../model/reservaciones'
// import {JsonPipe} from '@angular/common';

// @Component({
//   selector: 'app-reservaciones',
//   standalone: true,
//   imports: [JsonPipe],
//   templateUrl: './reservaciones.component.html',
//   styleUrl: './reservaciones.component.css'
// })
// export class ReservacionesComponent {
//   public Titulo = 'Administracion de Reservaciones';
//   public Reservaciones= signal<Reservaciones[]>([
//    {
//     NumeroReservacionID: 1,
//     FechaDeReservacion: new Date(), 
//     TipoCita: TipoCita.MakeUp,
//     SolicitanteID: 123
//    }
//   ]);
// }

import { Component, signal } from '@angular/core';
import { Reservaciones} from '../../model/reservaciones';
import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {jsPDF} from 'jspdf';
@Component({
  selector: 'app-Reservaciones',
  standalone: true,
  imports: [JsonPipe, FormsModule],
  templateUrl: './Reservaciones.component.html',
  styleUrl: './Reservaciones.component.css'
})
export class ReservacionesComponent {

  public Titulo = 'Administración de Reservaciones';
  public Reservaciones = signal<Reservaciones[]>([]);
  

  public NumeroReservacion?: number = 0;
  public FechaDeReservacion?: Date = new Date();
  public TipoCita?: string= "";
  public SolicitanteID?: number = 1;
 
  constructor(private http: HttpClient, private router: Router) {
    if (!this.validaAcceso()) {
      this.router.navigate(['']);
    }
    this.metodoGETReservaciones();
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

  public metodoGETReservaciones() {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });
    let cuerpo = {};
    this.http.post('http://localhost/reservacion/listar', cuerpo, {headers: encabezados})
    .subscribe((Reservaciones) => {
      const arr = Reservaciones as Reservaciones[];
      arr.forEach((Reservaciones) => {
        if (Reservaciones.NumeroReservacion) {
        this.agregarReservacionesALaSenial(Reservaciones.NumeroReservacion
          , Reservaciones.FechaDeReservacion, Reservaciones.TipoCita, Reservaciones.SolicitanteID
          );
        }if (Reservaciones.Token) {
          localStorage.setItem('Token', String(Reservaciones.Token));
        }
      });
    });
  };

  agregarHabilitado: boolean = true;

  public agregarReservaciones(event:  Event) {
    let tag = event.target as HTMLInputElement;
    let cuerpo = {
      FechaDeReservacion: this.FechaDeReservacion,
      TipoCita: this.TipoCita,
      SolicitanteID: this.SolicitanteID,
   
    };
    //console.log('Datos a enviar:', cuerpo);

    this.http.post('http://localhost/reservacion', cuerpo).subscribe(() => {
      // const nuevaProvincia = Provincia as Provincia;
      this.Reservaciones.update((Reservaciones) => [...Reservaciones, cuerpo]);
    });
   
    
      window.location.reload();
      this.limpiar();
   
  };
  


  public agregarReservacionesALaSenial(NumeroReservacion?: number
    , FechaDeReservacion?: Date
    , TipoCita?: string
    ,SolicitanteID?: number,
    ) {
    let nuevaReservaciones = {
      NumeroReservacion: NumeroReservacion ,
      FechaDeReservacion: FechaDeReservacion ,
      TipoCita: TipoCita,
      SolicitanteID: SolicitanteID
    

    };
    this.Reservaciones.update((Reservaciones) => [...Reservaciones, nuevaReservaciones]);
  };


  public modificarReservaciones(ID: any, event:  Event) {
    let tag = event.target as HTMLInputElement;
    let cuerpo = {
      FechaDeReservacion: this.FechaDeReservacion,
      TipoCita: this.TipoCita,
      SolicitanteID: this.SolicitanteID,
   
    };
    this.http.put('http://localhost/reservacion/'+ ID, cuerpo).subscribe(() => {
      
      this.Reservaciones.update((Reservaciones) => {
        return Reservaciones.map((Reservaciones) => {
          if (Reservaciones.NumeroReservacion === ID) {
            return { ...Reservaciones, ...cuerpo };
          }
          return Reservaciones;
        });
      });
      
    });
    this.limpiar();
  };

  public encontrarReservaciones(ID: any){
  this.http.get('http://localhost/reservacion/' + ID)
    .subscribe((Reservaciones) => {
    const arr = Reservaciones as Reservaciones[];
    arr.forEach((Reservaciones) => {
        this.NumeroReservacion = Reservaciones.NumeroReservacion;
        this.FechaDeReservacion = Reservaciones.FechaDeReservacion;
        this.TipoCita = Reservaciones.TipoCita;
        this.SolicitanteID = Reservaciones.SolicitanteID;
       
      });
   })
  this.agregarHabilitado = false;
  };

  public borrarReservaciones(ID: any) {
    console.log(ID);
    this.http.delete('http://localhost/reservacion/'+ID).subscribe(() => {
      this.Reservaciones.update((Reservaciones) => Reservaciones.filter((Reservaciones) => Reservaciones.NumeroReservacion !== ID));
    });
  };


  public limpiar(): void {
    this.NumeroReservacion = 0;
    this.FechaDeReservacion = new Date();
    this.TipoCita = "";
    this.SolicitanteID = 0;
    this.agregarHabilitado = true;
}

}






  