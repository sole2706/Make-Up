import { Routes } from '@angular/router';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { ReservacionesComponent } from './pages/reservaciones/reservaciones.component';
import { SolicitantesComponent } from './pages/solicitantes/solicitantes.component';
import { LoginComponent } from './pages/login/login.component';
import { CitasComponent } from './pages/citas/citas.component';

export const routes: Routes = [
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'facturas', component: FacturasComponent },
    { path: 'reservaciones', component: ReservacionesComponent },
    { path: 'solicitantes', component: SolicitantesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'citas', component: CitasComponent }

];
