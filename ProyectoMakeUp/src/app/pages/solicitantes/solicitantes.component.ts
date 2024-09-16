// import { Component, signal } from '@angular/core';
// import {Solicitantes} from '../../model/solicitantes';
// import {JsonPipe} from '@angular/common';
// @Component({
//   selector: 'app-solicitantes',
//   standalone: true,
//   imports: [JsonPipe],
//   templateUrl: './solicitantes.component.html',
//   styleUrl: './solicitantes.component.css'
// })
// export class SolicitantesComponent {
//   public Titulo = 'Administracion de Solicitantes';
//   public Solicitantes = signal<Solicitantes[]>([
//    {
//     SolicitanteID: 1,
//     NombreSolicitante: "John",
//     ApellidoSolicitante: "Doe",
//     Telefono: 1234567890,
//     Correo: "john.doe@example.com"

//    }
//   ]);
// }

import { Component, signal , NgModule} from '@angular/core';
import { Solicitantes } from '../../model/solicitantes';
import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Solicitantes',
  standalone: true,
  imports: [JsonPipe, FormsModule, CommonModule],
  templateUrl: './Solicitantes.component.html',
  styleUrl: './Solicitantes.component.css'
})
export class SolicitantesComponent {

  public Titulo = 'Administración de Solicitantes';
  public Solicitantes = signal<Solicitantes[]>([]);
  

  
  public SolicitanteID?:number= 1;
  public NombreSolicitante?: string = "";
  public ApellidoSolicitante?: string= "";
  public Correo?: string ="" +"@gmail.com";
  public Telefono?: number= 0;
    
  

  constructor(private http: HttpClient,private router: Router) {
    if (!this.validaAcceso()) {
      this.router.navigate(['']);
    }
    this.metodoGETSolicitantes();
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

  public metodoGETSolicitantes() {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });
    let cuerpo = {};
    this.http.post('http://localhost/solicitante/listar', cuerpo, {headers: encabezados})
    .subscribe((Solicitantes) => {
      const arr = Solicitantes as Solicitantes[];
      arr.forEach((Solicitantes) => {
        if (Solicitantes.SolicitanteID) {
        this.agregarSolicitanteALaSenial(Solicitantes.SolicitanteID
          , Solicitantes.NombreSolicitante, Solicitantes.ApellidoSolicitante, Solicitantes.Telefono
          , Solicitantes.Correo);
        }if (Solicitantes.Token) {
          localStorage.setItem('Token', String(Solicitantes.Token));
        }
      });
    });
  };
  agregarHabilitado: boolean = true;
  
  public agregarSolicitante(event:  Event) {
    let tag = event.target as HTMLInputElement;
    let cuerpo = {
      NombreSolicitante: this.NombreSolicitante,
      ApellidoSolicitante: this.ApellidoSolicitante,
      Telefono: this.Telefono,
      Correo: this.Correo,
      
   
    };
    //console.log('Datos a enviar:', cuerpo);

    this.http.post('http://localhost/solicitante', cuerpo).subscribe(() => {
      // const nuevaProvincia = Provincia as Provincia;
      this.Solicitantes.update((Solicitantes) => [...Solicitantes, cuerpo]);
    });
    window.location.reload();
    this.limpiar();
  };


  public agregarSolicitanteALaSenial(SolicitanteID?: number
    , NombreSolicitante?: string
    , ApellidoSolicitante?: string
    ,Telefono?: number,
     Correo?: string) {
    let nuevaSolicitante = {
      SolicitanteID: SolicitanteID,
      NombreSolicitante: NombreSolicitante ,
      ApellidoSolicitante: ApellidoSolicitante,
      Correo: Correo,
      Telefono: Telefono,

    };
    this.Solicitantes.update((Solicitantes) => [...Solicitantes, nuevaSolicitante]);
    
  };

  
  public modificarSolicitante(ID: any, event:  Event) {
    let tag = event.target as HTMLInputElement;
    let cuerpo = {
      NombreSolicitante: this.NombreSolicitante,
      ApellidoSolicitante: this.ApellidoSolicitante,
      Telefono: this.Telefono,
      Correo: this.Correo,
      
   
    };
    console.log(ID);
    this.http.put('http://localhost/solicitante/'+ ID, cuerpo).subscribe(() => {
      
      this.Solicitantes.update((Solicitantes) => {
        return Solicitantes.map((Solicitantes) => {
          if (Solicitantes.SolicitanteID === ID) {
            return { ...Solicitantes, ...cuerpo };
          }
          return Solicitantes;
          
        });
      });
      
    });
    this.limpiar();
   
  };
  

  public encontrarSolicitante(ID: any){
  this.http.get('http://localhost/solicitante/' + ID)
    .subscribe((Solicitantes) => {
    const arr = Solicitantes as Solicitantes[];
    arr.forEach((Solicitantes) => {
        this.SolicitanteID = Solicitantes.SolicitanteID;
        this.NombreSolicitante = Solicitantes.NombreSolicitante;
        this.ApellidoSolicitante = Solicitantes.ApellidoSolicitante;
        this.Correo = Solicitantes.Correo;
        this.Telefono= Solicitantes.Telefono;
        
      });
   })
      this.agregarHabilitado = false;
  };


  public borrarSolicitante(ID: any) {
    console.log(ID);
    this.http.delete('http://localhost/solicitante/'+ID).subscribe(() => {
      this.Solicitantes.update((Solicitantes) => Solicitantes.filter((Solicitante) => Solicitante.SolicitanteID !== ID));
    });
  };
  public limpiar(): void {
    this.SolicitanteID = 1;
    this.NombreSolicitante = "";
    this.ApellidoSolicitante = "";
    this.Correo = "@gmail.com";
    this.Telefono = 0;
    this.agregarHabilitado = true;
}

}



