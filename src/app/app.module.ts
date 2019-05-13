import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {routing, appRoutingProviders} from './app-routing.module';

// Modulos propios
import { MaterialModule } from './material.module';
import { DashboardModule } from './components/dashboard/dashboard.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PhotosComponent } from './components/photos/photos.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PhotosComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    routing,
    DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
