// Este fichero se encarga de configurar las rutas del modulo dashboard

// Importar los modulos necesarios para crear modulos
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Importar componentes
import { MainComponent } from './components/main/main.component';
import {NavVarComponent} from './components/nav-var/nav-var.component';
import { CliHomeComponent } from './components/home/cli-home/home.component';
import { PubliHomeComponent } from './components/home/publi-home/publi-home.component';
import { ListarCliComponent } from './components/cliente/listar-cli/listar-cli.component';
import { ListarUsuComponent } from './components/usuario/listar-usu/listar-usu.component';
import { ListarProComponent } from './components/producto/listar-pro/listar-pro.component';
import { AdminHomeComponent } from './components/home/admin-home/admin-home.component';
import { AllRecargasComponent } from './components/reportes/all-recargas/all-recargas.component';
import { AllRepartosComponent } from './components/reportes/all-repartos/all-repartos.component';
import { MisRecargasComponent } from './components/reportes/mis-recargas/mis-recargas.component';
import { MisRepartosComponent } from './components/reportes/mis-repartos/mis-repartos.component';
import { RepartosClientesComponent } from './components/reportes/repartos-clientes/repartos-clientes.component';
import { MisClientesComponent } from './components/mis-clientes/mis-clientes.component';
import { AseHomeComponent } from './components/home/ase-home/ase-home.component';
import { MayoDistriHomeComponent } from './components/home/mayo-distri-home/mayo-distri-home.component';



// Servicios
import { AdminGuard } from '../../services/guards/admin.guard';
import { AsesorGuard } from '../../services/guards/asesor.guard';
import { CargasGuard } from '../../services/guards/cargas.guard';
import { ClienteGuard } from 'src/app/services/guards/cliente.guard';
import { DistribuidorGuard } from '../../services/guards/distribuidor.guard';
import { MayoristaGuard } from '../../services/guards/mayorista.guard';
import { MisDatosComponent } from './components/mis-datos/mis-datos.component';


const dashboardRoutes: Routes = [

{path: 'dashboard/admin', component: NavVarComponent, canActivate: [AdminGuard],
    children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: AdminHomeComponent },
        {path: 'clientes', component: ListarCliComponent},
        {path: 'usuarios', component: ListarUsuComponent},
        {path: 'productos', component: ListarProComponent},
        {path: 'recargas', component: AllRecargasComponent},
        {path: 'repartos', component: AllRepartosComponent},
        {path: 'perfil', component: MisDatosComponent}
    ]
},

{path: 'dashboard/asesor', component: NavVarComponent, canActivate: [AsesorGuard],
    children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: AseHomeComponent },
        {path: 'clientes', component: ListarCliComponent},
        {path: 'recargas', component: AllRecargasComponent},
        {path: 'repartos', component: AllRepartosComponent},
        {path: 'perfil', component: MisDatosComponent}
    ]
},

{path: 'dashboard/cargas', component: NavVarComponent, canActivate: [CargasGuard],
    children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: AseHomeComponent },
        {path: 'clientes', component: ListarCliComponent},
        {path: 'recargas', component: AllRecargasComponent},
        {path: 'repartos', component: AllRepartosComponent},
        {path: 'perfil', component: MisDatosComponent}
    ]
},

{path: 'dashboard/cliente', component: NavVarComponent, canActivate: [ClienteGuard],
    children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: CliHomeComponent },
        {path: 'recargas', component: MisRecargasComponent},
        {path: 'repartos', component: MisRepartosComponent},
        {path: 'perfil', component: MisDatosComponent},
        {path: 'activar', component:  PubliHomeComponent}
    ]
},

{path: 'dashboard/distribuidor', component: NavVarComponent, canActivate: [DistribuidorGuard],
    children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: MayoDistriHomeComponent },
        {path: 'clientes', component: MisClientesComponent},
        {path: 'repartos', component: MisRepartosComponent},
        {path: 'repartos-clientes', component: RepartosClientesComponent},
        {path: 'perfil', component: MisDatosComponent}
    ]
},

{path: 'dashboard/mayorista', component: NavVarComponent, canActivate: [MayoristaGuard],
    children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: MayoDistriHomeComponent },
        {path: 'clientes', component: MisClientesComponent},
        {path: 'repartos', component: MisRepartosComponent},
        {path: 'repartos-clientes', component: RepartosClientesComponent},
        {path: 'perfil', component: MisDatosComponent}
    ]
},

];

@NgModule({
    imports: [ RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule],

})

export class DashboardRoutingModule { }
