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

// Servicios
import { AdminGuard } from '../../services/guards/admin.guard';
import { AsesorGuard } from '../../services/guards/asesor.guard';
import { CargasGuard } from '../../services/guards/cargas.guard';
import { ClienteGuard } from 'src/app/services/guards/cliente.guard';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AllRecargasComponent } from './components/reportes/all-recargas/all-recargas.component';
import { AllRepartosComponent } from './components/reportes/all-repartos/all-repartos.component';
import { MisRecargasComponent } from './components/reportes/mis-recargas/mis-recargas.component';
import { MisRepartosComponent } from './components/reportes/mis-repartos/mis-repartos.component';


const dashboardRoutes: Routes = [

{path: 'dashboard/admin', component: MainComponent, canActivate: [AdminGuard],
    children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: AdminHomeComponent },
        {path: 'clientes', component: ListarCliComponent},
        {path: 'usuarios', component: ListarUsuComponent},
        {path: 'productos', component: ListarProComponent},
        {path: 'recargas', component: AllRecargasComponent},
        {path: 'repartos', component: AllRepartosComponent}
    ]
},

{path: 'dashboard/asesor', component: MainComponent, canActivate: [AsesorGuard],
    children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: AdminHomeComponent },
        {path: 'clientes', component: ListarCliComponent},
        {path: 'recargas', component: AllRecargasComponent},
        {path: 'repartos', component: AllRepartosComponent}
    ]
},

{path: 'dashboard/cargas', component: MainComponent, canActivate: [CargasGuard],
    children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: AdminHomeComponent },
        {path: 'clientes', component: ListarCliComponent},
        {path: 'recargas', component: AllRecargasComponent},
        {path: 'repartos', component: AllRepartosComponent}
    ]
},

{path: 'dashboard/cliente', component: MainComponent, canActivate: [ClienteGuard],
    children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: HomeComponent },
        {path: 'recargas', component: MisRecargasComponent},
        {path: 'repartos', component: MisRepartosComponent}
    ]
},

];

@NgModule({
    imports: [ RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule],

})

export class DashboardRoutingModule { }
