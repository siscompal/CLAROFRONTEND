// Este fichero se encarga de configurar las rutas del modulo dashboard

// Importar los modulos necesarios para crear modulos
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Importar componentes
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { ListarCliComponent } from './components/cliente/listar-cli/listar-cli.component';
import { ListarUsuComponent } from './components/usuario/listar-usu/listar-usu.component';
import { ListarProComponent } from './components/producto/listar-pro/listar-pro.component';
import { AdminGuard } from '../../services/guards/admin.guard';
import { AsesorGuard } from '../../services/guards/asesor.guard';
import { CargasGuard } from '../../services/guards/cargas.guard';


const dashboardRoutes: Routes = [

{path: 'dashboard/admin', component: MainComponent, canActivate: [AdminGuard],
    children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: HomeComponent },
        {path: 'clientes', component: ListarCliComponent},
        {path: 'usuarios', component: ListarUsuComponent},
        {path: 'productos', component: ListarProComponent},
    ]
},

{path: 'dashboard/asesor', component: MainComponent, canActivate: [AsesorGuard],
    children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: HomeComponent },
        {path: 'clientes', component: ListarCliComponent},
    ]
},

{path: 'dashboard/cargas', component: MainComponent, canActivate: [CargasGuard],
    children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: HomeComponent },
        {path: 'clientes', component: ListarCliComponent},
    ]
},

];

@NgModule({
    imports: [ RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule],

})

export class DashboardRoutingModule { }
