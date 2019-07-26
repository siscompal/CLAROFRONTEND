import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PublicidadComponent } from './components/publicidad/publicidad.component';

const appRoutes: Routes = [

  {path: '', component: LoginComponent},
  {path: 'registrarse', component: SignUpComponent},
  {path: 'publicidad', component: PublicidadComponent}
];


// Exportar el modulo del router
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


