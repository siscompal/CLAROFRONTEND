import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [

  {path: '', component: LoginComponent},
  // {path: '**', component: LoginComponent},
];


// Exportar el modulo del router
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


