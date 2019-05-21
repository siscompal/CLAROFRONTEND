// Este es el fichero de configuracion del modulo dashboard, es el encargado de crear el modulo

// Modulos
import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {HttpClientModule} from '@angular/common/http';

// Modulos propios
import { MaterialModule } from '../../material.module';

import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { CrearCliComponent } from './components/cliente/crear-cli/crear-cli.component';
import { ListarCliComponent } from './components/cliente/listar-cli/listar-cli.component';
import { SaldoComponent } from './components/cliente/saldo/saldo.component';
import { CrearUsuComponent } from './components/usuario/crear-usu/crear-usu.component';
import { ListarUsuComponent } from './components/usuario/listar-usu/listar-usu.component';
import { CrearProComponent } from './components/producto/crear-pro/crear-pro.component';
import { ListarProComponent } from './components/producto/listar-pro/listar-pro.component';


@NgModule({
    declarations: [
      MainComponent,
      HomeComponent,
      CrearCliComponent,
      ListarCliComponent,
      SaldoComponent,
      CrearUsuComponent,
      ListarUsuComponent,
      CrearProComponent,
      ListarProComponent


    ],
    imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      DashboardRoutingModule,
      MaterialModule,
      ReactiveFormsModule

    ],
    providers: [
    ]
  })
  export class DashboardModule { }
