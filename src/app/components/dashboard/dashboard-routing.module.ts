// Este fichero se encarga de configurar las rutas del modulo dashboard

// Importar los modulos necesarios para crear modulos
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Importar componentes
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { CrearCliComponent } from './components/cliente/crear-cli/crear-cli.component';
import { ListarCliComponent } from './components/cliente/listar-cli/listar-cli.component';
import { SaldoComponent } from './components/cliente/saldo/saldo.component';
import { CrearUsuComponent } from './components/usuario/crear-usu/crear-usu.component';
import { ListarUsuComponent } from './components/usuario/listar-usu/listar-usu.component';
import { CrearProComponent } from './components/producto/crear-pro/crear-pro.component';
import { ListarProComponent } from './components/producto/listar-pro/listar-pro.component';
import { AuthGuard } from '../../services/guards/login.guard';


const dashboardRoutes: Routes = [

{path: 'dashboard', component: MainComponent, canActivate: [AuthGuard],
    children: [
        { path: '', redirectTo: 'home', pathMatch: 'full'},
        { path: 'home', component: HomeComponent },
        {path: 'clientes', component: ListarCliComponent},
        {path: 'crear-usuario', component: CrearUsuComponent},
        {path: 'listado-usuarios', component: ListarUsuComponent},
        {path: 'saldo', component: SaldoComponent},
        {path: 'crear-producto', component: CrearProComponent},
        {path: 'listado-productos', component: ListarProComponent},
    ]
}

];

@NgModule({
    imports: [ RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule],

})

export class DashboardRoutingModule { }
