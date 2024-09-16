// import { Component, signal } from '@angular/core';
// import {Usuario} from '../../model/usuarios';
// import {JsonPipe} from '@angular/common';

// @Component({
//   selector: 'app-usuarios',
//   standalone: true,
//   imports: [JsonPipe],
//   templateUrl: './usuarios.component.html',
//   styleUrl: './usuarios.component.css'
// })
// export class UsuariosComponent {
//   public Titulo = 'Administracion de Usuarios';
//   public Usuarios = signal<Usuario[]>([
//    {
//     UsuarioID: "1",
//     NombreUsuario:   "DAVID",
//     ApellidoUsuario: "SOLERA",
//     Telefono:       89042357,
//     Correo:     "DSOLERA1009@GMAIL.COM",
//     Contrasena:   "PASSWORD123",
//    }
//   ]);
// }

import { Component, signal } from '@angular/core';
import { Usuario } from '../../model/usuarios';
import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [JsonPipe, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  public Titulo = 'Administración de Usuarios';
  public Usuario = signal<Usuario[]>([]);


   

  public UsuarioID?: string = "";
  public NombreUsuario?: string = "";
  public ApellidoUsuario?: string= "";
  public Contrasena?: string = "";
  public Correo?: string =""+"@gmail.com";
  public Telefono?: number= 0;
    
  

  constructor(private http: HttpClient, private router: Router) {
    if (!this.validaAcceso()) {
      this.router.navigate(['']);
    }
    this.metodoGETUsuarios();
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

  public metodoGETUsuarios() {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });
    let cuerpo = {};
    this.http.post('http://localhost/usuarios/listar', cuerpo, {headers: encabezados})
    .subscribe((Usuario) => {
      const arr = Usuario as Usuario[];
      arr.forEach((Usuario) => {
        if (Usuario.UsuarioID) {
        this.agregarUsuarioALaSenial(Usuario.UsuarioID
          , Usuario.NombreUsuario, Usuario.ApellidoUsuario, Usuario.Telefono
          , Usuario.Correo, Usuario.Contrasena);
        }if (Usuario.Token) {
          localStorage.setItem('Token', String(Usuario.Token));
        }
      });
    });
  };

  agregarHabilitado: boolean = true;

  public agregarUsuarioALaSenial(UsuarioID?: string,
     NombreUsuario?: string,
     ApellidoUsuario?: string,
     Telefono?: number,
     Correo?: string,
    Contrasena?: string) {
    let nuevaUsuario = {
      UsuarioID: UsuarioID,
      NombreUsuario: NombreUsuario,
      ApellidoUsuario: ApellidoUsuario,
      Telefono: Telefono,
      Contrasena: Contrasena,
      Correo: Correo,
      

    };
    this.Usuario.update((Usuario) => [...Usuario, nuevaUsuario]);
  };

  public agregarUsuario(event: Event) {
    let tag = event.target as HTMLInputElement;
    let cuerpo = {
      NombreUsuario: this.NombreUsuario,
      ApellidoUsuario: this.ApellidoUsuario,
      Telefono: this.Telefono,
      Correo: this.Correo,
      Contrasena: this.Contrasena,
   
    };
    //console.log('Datos a enviar:', cuerpo);

    this.http.post('http://localhost/usuarios', cuerpo).subscribe(() => {
      // const nuevaProvincia = Provincia as Provincia;
      this.Usuario.update((Usuario) => [...Usuario, cuerpo]);
    });
    window.location.reload();
    this.limpiar();
  };



  public modificarUsuario(ID: any, event:  Event) {
    let tag = event.target as HTMLInputElement;
    let cuerpo = {
      NombreUsuario: this.NombreUsuario,
      ApellidoUsuario: this.ApellidoUsuario,
      Telefono: this.Telefono,
      Contrasena: this.Contrasena,
      Correo: this.Correo,
      
    };
    console.log(ID);
    this.http.put('http://localhost/usuarios/'+ ID, cuerpo).subscribe(() => {
      
      this.Usuario.update((Usuario) => {
        return Usuario.map((Usuario) => {
          if (Usuario.UsuarioID === ID) {
            return { ...Usuario, ...cuerpo };
          }
          return Usuario;
        });
      });
      
    });
    this.limpiar();
  };

  public encontrarUsuario(ID: any){
  this.http.get('http://localhost/usuarios/' + ID)
    .subscribe((Usuario) => {
    const arr = Usuario as Usuario[];
    arr.forEach((Usuario) => {
        this.UsuarioID = Usuario.UsuarioID;
        this.NombreUsuario = Usuario.NombreUsuario;
        this.ApellidoUsuario = Usuario.ApellidoUsuario;
        this.Correo = Usuario.Correo;
        this.Telefono= Usuario.Telefono;
        this.Contrasena = Usuario.Contrasena;
       
      });
   })
    this.agregarHabilitado = false;
  };




  public borrarUsuario(ID: any) {
    console.log(ID);
    this.http.delete('http://localhost/usuarios/'+ID).subscribe(() => {
      this.Usuario.update((Usuario) => Usuario.filter((Usuario) => Usuario.UsuarioID !== ID));
    });
  };

  public limpiar(): void {
    this.NombreUsuario = "";
    this.ApellidoUsuario = "";
    this.Contrasena = "";
    this.Correo = "@gmail.com";
    this.Telefono = 0;
    this.agregarHabilitado = true;
}
  

}

