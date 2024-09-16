import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Payload } from '../../model/payload';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public Usuario: String = '';
  public Clave: String = '';
  public UsuarioID: Number=0;

  constructor(private http: HttpClient, private router: Router) {
    localStorage.setItem('Token', "");
    localStorage.setItem('Rol', "");
    localStorage.setItem('Usuario', "");
    localStorage.setItem('UsuarioID', "");
  };

  public autenticar() {
    let cuerpo = {
      Correo: this.Usuario,
      Contrasena: this.Clave,
      UsuarioID: this.UsuarioID
    };
  
    localStorage.setItem('Usuario', String(this.Usuario));
  
    this.http.post('http://localhost/usuarios/autenticar/', cuerpo).subscribe((token: any) => {
      // Verifica si el token es válido
      if (token && token !== false) {
        localStorage.setItem('Token', String(token));
        
        const encabezados = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
        });
  
        this.http.post('http://localhost/usuarios/validarToken', {}, { headers: encabezados }).subscribe((datos: any) => {
          if (datos && datos.Rol && datos.UsuarioID) {
            localStorage.setItem('Rol', String(datos.Rol));
            localStorage.setItem('UsuarioID', String(datos.UsuarioID));
  
            // Redirige solo si la validación del token fue exitosa
            this.router.navigate(['']);
            this.limpiar();
            alert('La autenticación ha sido exitosa.');
          } else {
            alert('La validación del token falló.');
          }
        }, error => {
          alert('Error al validar el token.');
        });
      } else {
        alert('Autenticación fallida.');
      }
    }, error => {
      alert('Error al autenticar al usuario.');
    });
  }
  

  public desautenticar() {
    // Obtener el ID de usuario almacenado en localStorage
    const storedUsuarioID = localStorage.getItem('UsuarioID');
    
    // Convertir el ID almacenado a número
    const usuarioID = storedUsuarioID ? Number(storedUsuarioID) : null;
  
    // Verificar si el usuarioID es 0 o nulo
    if (usuarioID === null || usuarioID === 0) {
      console.log("No hay usuario autenticado o el ID es 0, no se realiza la desautenticación.");
      return; // Salir del método si no es necesario desautenticar
    }
  
    // Preparar el cuerpo de la solicitud
    let cuerpo = {
      UsuarioID: usuarioID
    };
  
    // Realizar la solicitud POST para desautenticar
    this.http.post('http://localhost/usuarios/desautenticar', cuerpo).subscribe(() => {
      // Limpiar el localStorage
      localStorage.setItem('Token', "");
      localStorage.setItem('Rol', "");
      localStorage.setItem('Usuario', "");
      localStorage.setItem('UsuarioID', "");
  
      // Navegar a la página principal
      this.router.navigate(['']);
    });
  }
  
  public limpiar(): void {
    this.Clave = "";
    this.Usuario="";
}
}
