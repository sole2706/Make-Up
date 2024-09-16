import { Component, signal } from '@angular/core';
import { formatDate, JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Facturas } from '../../model/facturas';
import { Solicitantes } from '../../model/solicitantes';
import { Reservaciones } from '../../model/reservaciones';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [JsonPipe, FormsModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css',
})
export class CitasComponent {
  public TipoCita?: string = '';
  public SolicitanteID?: number = 1;
  public mensajeConfirmacion: string = '';
  public mensajeConfirmacion1: string = '';

  constructor(private http: HttpClient, private router: Router) {
    if (!this.validaAcceso()) {
      this.router.navigate(['/login']);
    }
    this.metodoGETSolicitantes();
    this.metodoGETReservaciones();
  }
  public validaAcceso() {
    if (String(localStorage.getItem('Rol')) === "UsuarioNivel0") {
      return true;
    }
    if (String(localStorage.getItem('Rol')) === "AdminNivel1") {
      return true;
    }
    return false;
  };
  public Solicitantes = signal<Solicitantes[]>([]);

  public SolicitanteIDS?: number = 1;
  public NombreSolicitante?: string = '';
  public ApellidoSolicitante?: string = '';
  public Correo?: string = '' + '@gmail.com';
  public Telefono?: number = 0;

  public metodoGETSolicitantes() {
    const encabezados = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(localStorage.getItem('Token'))
    });
    let cuerpo = {};
    this.http.post('http://localhost/solicitante/listar', cuerpo, {headers: encabezados}).subscribe((Solicitantes) => {
        const arr = Solicitantes as Solicitantes[];
        arr.forEach((Solicitantes) => {
          if (Solicitantes.SolicitanteID) {
          this.agregarSolicitanteALaSenial(
            Solicitantes.SolicitanteID,
            Solicitantes.NombreSolicitante,
            Solicitantes.ApellidoSolicitante,
            Solicitantes.Telefono,
            Solicitantes.Correo
          )
        }if (Solicitantes.Token) {
          localStorage.setItem('Token', String(Solicitantes.Token));
        }
      });
    });
  };

  public agregarSolicitante(event: Event) {
    let tag = event.target as HTMLInputElement;
    let cuerpo = {
      NombreSolicitante: this.NombreSolicitante,
      ApellidoSolicitante: this.ApellidoSolicitante,
      Telefono: this.Telefono,
      Correo: this.Correo,
    };
    //console.log('Datos a enviar:', cuerpo);

    this.http.post('http://localhost/solicitante', cuerpo).subscribe(
      () => {
        // const nuevaProvincia = Provincia as Provincia;
        this.Solicitantes.update((Solicitantes) => [...Solicitantes, cuerpo]);

        this.mensajeConfirmacion = 'Solicitante agregado correctamente.';
      },
      (error) => {
        // Manejar error en la solicitud HTTP
        this.mensajeConfirmacion =
          'Error al agregar solicitante. Inténtalo de nuevo.';
      }
    );
    this.limpiar();

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  public agregarSolicitanteALaSenial(
    SolicitanteID?: number,
    NombreSolicitante?: string,
    ApellidoSolicitante?: string,
    Telefono?: number,
    Correo?: string
  ) {
    let nuevaSolicitante = {
      SolicitanteID: SolicitanteID,
      NombreSolicitante: NombreSolicitante,
      ApellidoSolicitante: ApellidoSolicitante,
      Correo: Correo,
      Telefono: Telefono,
    };
    this.Solicitantes.update((Solicitantes) => [
      ...Solicitantes,
      nuevaSolicitante,
    ]);
  }

  public modificarSolicitante(ID: any, event: Event) {
    let tag = event.target as HTMLInputElement;
    let cuerpo = {
      NombreSolicitante: this.NombreSolicitante,
      ApellidoSolicitante: this.ApellidoSolicitante,
      Telefono: this.Telefono,
      Correo: this.Correo,
    };
    console.log(ID);
    this.http
      .put('http://localhost/solicitante/' + ID, cuerpo)
      .subscribe(() => {
        this.Solicitantes.update((Solicitantes) => {
          return Solicitantes.map((Solicitantes) => {
            if (Solicitantes.SolicitanteID === ID) {
              return { ...Solicitantes, ...cuerpo };
            }
            return Solicitantes;
          });
        });
      });
  }

  public encontrarSolicitante(ID: any) {
    this.http
      .get('http://localhost/reservacion/' + ID)
      .subscribe((Reservaciones) => {
        const arr = Reservaciones as Reservaciones[];
        arr.forEach((Reservaciones) => {
          this.SolicitanteID = Reservaciones.SolicitanteID;
        });
      });
  }

  public Reservaciones = signal<Reservaciones[]>([]);

  public NumeroReservacion?: number = 0;
  public FechaDeReservacion?: Date = new Date();
  public TipoCitaR?: string = '';
  public SolicitanteIDR?: number = 1;

  public metodoGETReservaciones() {
    let cuerpo = {};
    this.http
      .get('http://localhost/reservacion', cuerpo)
      .subscribe((Reservaciones) => {
        const arr = Reservaciones as Reservaciones[];
        arr.forEach((Reservaciones) => {
          this.agregarReservacionesALaSenial(
            Reservaciones.NumeroReservacion,
            Reservaciones.FechaDeReservacion,
            Reservaciones.TipoCita,
            Reservaciones.SolicitanteID
          );
        });
        //console.log(typeof(arr));
      });
  }

  public agregarReservaciones(event: Event) {
    let tag = event.target as HTMLInputElement;
    let cuerpo = {
      FechaDeReservacion: this.FechaDeReservacion,
      TipoCita: this.TipoCita,
      SolicitanteID: this.SolicitanteID,
    };
    //console.log('Datos a enviar:', cuerpo);

    this.http.post('http://localhost/reservacion', cuerpo).subscribe(
      () => {
        this.Reservaciones.update((Reservaciones) => [
          ...Reservaciones,
          cuerpo,
        ]);

        // Actualizar el mensaje de confirmación
        this.mensajeConfirmacion = 'Cita agregada correctamente.';
      },
      (error) => {
        // Manejar error en la solicitud HTTP
        this.mensajeConfirmacion = 'Error al agregar cita. Inténtalo de nuevo.';
      }
    );
    this.limpiar();
    window.location.reload();
  }

  public agregarReservacionesALaSenial(
    NumeroReservacion?: number,
    FechaDeReservacion?: Date,
    TipoCita?: string,
    SolicitanteID?: number
  ) {
    let nuevaReservaciones = {
      NumeroReservacion: NumeroReservacion,
      FechaDeReservacion: FechaDeReservacion,
      TipoCita: TipoCita,
      SolicitanteID: SolicitanteID,
    };
    this.Reservaciones.update((Reservaciones) => [
      ...Reservaciones,
      nuevaReservaciones,
    ]);
  }
  public limpiar(): void {
    this.NumeroReservacion = 0;
    this.FechaDeReservacion = new Date();
    this.TipoCita = '';
    this.SolicitanteID = 1;
  }
  public modificarReservaciones(ID: any, event: Event) {
    let tag = event.target as HTMLInputElement;
    let cuerpo = {
      FechaDeReservacion: this.FechaDeReservacion,
      TipoCita: this.TipoCita,
      SolicitanteID: this.SolicitanteID,
    };
    this.http
      .put('http://localhost/reservacion/' + ID, cuerpo)
      .subscribe(() => {
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
  }
  public borrarReservaciones(ID: any) {
    console.log(ID);
    this.http.delete('http://localhost/reservacion/' + ID).subscribe(
      () => {
        this.Reservaciones.update((Reservaciones) =>
          Reservaciones.filter(
            (Reservaciones) => Reservaciones.NumeroReservacion !== ID
          )
        );
        // Actualizar el mensaje de confirmación
        this.mensajeConfirmacion1 = 'Cita cancelada correctamente';
      },
      (error) => {
        // Manejar error en la solicitud HTTP
        this.mensajeConfirmacion1 =
          'Error al cancelar la cita. Inténtalo de nuevo.';
      }
    );
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  public encontrarReservaciones(ID: any) {
    this.http
      .get('http://localhost/reservacion/' + ID)
      .subscribe((Reservaciones) => {
        const arr = Reservaciones as Reservaciones[];
        arr.forEach((Reservaciones) => {
          this.NumeroReservacion = Reservaciones.NumeroReservacion;
          this.FechaDeReservacion = Reservaciones.FechaDeReservacion;
          this.TipoCita = Reservaciones.TipoCita;
          this.SolicitanteID = Reservaciones.SolicitanteID;
        });
      });
  }
}
