import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { Http, Response, Headers } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {routing} from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos propios
import { MaterialModule } from './material.module';
import { DashboardModule } from './components/dashboard/dashboard.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CrearCliComponent } from './components/dashboard/components/cliente/crear-cli/crear-cli.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerCliComponent } from './components/dashboard/components/cliente/ver-cli/ver-cli.component';
import { EditarCliComponent } from './components/dashboard/components/cliente/editar-cli/editar-cli.component';
import { VerUsuComponent } from './components/dashboard/components/usuario/ver-usu/ver-usu.component';
import { EditarUsuComponent } from './components/dashboard/components/usuario/editar-usu/editar-usu.component';
import { CrearUsuComponent } from './components/dashboard/components/usuario/crear-usu/crear-usu.component';
import { CrearProComponent } from './components/dashboard/components/producto/crear-pro/crear-pro.component';
import { EditarProComponent } from './components/dashboard/components/producto/editar-pro/editar-pro.component';
import { VerProComponent } from './components/dashboard/components/producto/ver-pro/ver-pro.component';
import { SaldoComponent } from './components/dashboard/components/cliente/saldo/saldo.component';
import { DistribuidorGuard } from './services/guards/distribuidor.guard';
import { MayoristaGuard } from './services/guards/mayorista.guard';
import { FiltrarProComponent } from './components/dashboard/components/producto/filtrar-pro/filtrar-pro.component';
import { CambiarPassComponent } from './components/dashboard/components/cambiar-pass/cambiar-pass.component';
import { ActivationService } from './services/activation.service';
import { EditarSimComponent } from './components/dashboard/components/sim/editar-sim/editar-sim.component';
import { ActivarSimComponent } from './components/dashboard/components/sim/activar-sim/activar-sim.component';

// Servicios
import { UserService } from './services/user.service';
import { ClientService } from './services/client.service';
import { ProductService } from './services/product.service';
import { CdkColumnDef } from '@angular/cdk/table';
import { RecargaService } from './services/recarga.service';
import { AdminGuard } from './services/guards/admin.guard';
import { AsesorGuard } from './services/guards/asesor.guard';
import { CargasGuard } from './services/guards/cargas.guard';
import { ClienteGuard } from './services/guards/cliente.guard';
import { ImageService } from './services/image.service';
import { PublicidadComponent } from './components/publicidad/publicidad.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    PublicidadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    routing,
    DashboardModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ],
  providers: [UserService,
              ClientService,
              ProductService,
              CdkColumnDef,
              RecargaService,
              AdminGuard,
              AsesorGuard,
              CargasGuard,
              ClienteGuard,
              DistribuidorGuard,
              MayoristaGuard,
              ActivationService,
              ImageService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CrearCliComponent,
    VerCliComponent,
    EditarCliComponent,
    VerUsuComponent,
    EditarUsuComponent,
    CrearUsuComponent,
    CrearProComponent,
    EditarProComponent,
    VerProComponent,
    SaldoComponent,
    FiltrarProComponent,
    CambiarPassComponent,
    EditarSimComponent,
    ActivarSimComponent,
    PublicidadComponent
  ]
})
export class AppModule { }
