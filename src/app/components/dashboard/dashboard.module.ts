// Este es el fichero de configuracion del modulo dashboard, es el encargado de crear el modulo

// Modulos
import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



// Modulos propios
import { MaterialModule } from '../../material.module';
import { MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatDatepickerModule} from '@angular/material/datepicker';

// Componentes
import { MainComponent } from './components/main/main.component';
import { CliHomeComponent } from './components/home/cli-home/home.component';
import { CrearCliComponent } from './components/cliente/crear-cli/crear-cli.component';
import { ListarCliComponent } from './components/cliente/listar-cli/listar-cli.component';
import { SaldoComponent } from './components/cliente/saldo/saldo.component';
import { CrearUsuComponent } from './components/usuario/crear-usu/crear-usu.component';
import { ListarUsuComponent } from './components/usuario/listar-usu/listar-usu.component';
import { CrearProComponent } from './components/producto/crear-pro/crear-pro.component';
import { ListarProComponent } from './components/producto/listar-pro/listar-pro.component';
import { VerCliComponent } from './components/cliente/ver-cli/ver-cli.component';
import { EditarCliComponent } from './components/cliente/editar-cli/editar-cli.component';
import { VerUsuComponent } from './components/usuario/ver-usu/ver-usu.component';
import { EditarUsuComponent } from './components/usuario/editar-usu/editar-usu.component';
import { EditarProComponent } from './components/producto/editar-pro/editar-pro.component';
import { VerProComponent } from './components/producto/ver-pro/ver-pro.component';
import { AdminHomeComponent } from './components/home/admin-home/admin-home.component';
import { AllRepartosComponent } from './components/reportes/all-repartos/all-repartos.component';
import { AllRecargasComponent } from './components/reportes/all-recargas/all-recargas.component';
import { MisRepartosComponent } from './components/reportes/mis-repartos/mis-repartos.component';
import { MisRecargasComponent } from './components/reportes/mis-recargas/mis-recargas.component';
import { PubliHomeComponent } from './components/home/publi-home/publi-home.component';
import { MisClientesComponent } from './components/mis-clientes/mis-clientes.component';
import { RepartosClientesComponent } from './components/reportes/repartos-clientes/repartos-clientes.component';
import { FiltrarProComponent } from './components/producto/filtrar-pro/filtrar-pro.component';
import { AseHomeComponent } from './components/home/ase-home/ase-home.component';
import { MisDatosComponent } from './components/mis-datos/mis-datos.component';
import { CambiarPassComponent } from './components/cambiar-pass/cambiar-pass.component';
import { EditarSimComponent } from './components/sim/editar-sim/editar-sim.component';
import { ActivarSimComponent } from './components/sim/activar-sim/activar-sim.component';
import { MayoDistriHomeComponent } from './components/home/mayo-distri-home/mayo-distri-home.component';
import { PublicidadComponent } from '../publicidad/publicidad.component';
import { NavVarComponent } from './components/nav-var/nav-var.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FiltroRecargasComponent } from './components/reportes/filtro-recargas/filtro-recargas.component';
import { FiltroRepartosComponent } from './components/reportes/filtro-repartos/filtro-repartos.component';


@NgModule({
    declarations: [
      MainComponent,
      CliHomeComponent,
      CrearCliComponent,
      ListarCliComponent,
      SaldoComponent,
      CrearUsuComponent,
      ListarUsuComponent,
      CrearProComponent,
      ListarProComponent,
      VerCliComponent,
      EditarCliComponent,
      VerUsuComponent,
      EditarUsuComponent,
      EditarProComponent,
      VerProComponent,
      AdminHomeComponent,
      AllRepartosComponent,
      AllRecargasComponent,
      MisRepartosComponent,
      MisRecargasComponent,
      PubliHomeComponent,
      MisClientesComponent,
      RepartosClientesComponent,
      FiltrarProComponent,
      AseHomeComponent,
      MisDatosComponent,
      CambiarPassComponent,
      EditarSimComponent,
      ActivarSimComponent,
      MayoDistriHomeComponent,
      PublicidadComponent,
      NavVarComponent,
      FiltroRecargasComponent,
      FiltroRepartosComponent

    ],
    imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      DashboardRoutingModule,
      MaterialModule,
      ReactiveFormsModule,
      LayoutModule,
      MatToolbarModule,
      MatButtonModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatDatepickerModule,
      MatMomentDateModule,
      NgbModule

    ],
    providers: [
    ]
  })
  export class DashboardModule { }
