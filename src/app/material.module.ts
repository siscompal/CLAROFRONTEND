// Modulo creado para importar todos los modulos requeridos de material

import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';

import {
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule


} from '@angular/material';

@NgModule({
    imports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatListModule,
    MatTabsModule

    ],
    exports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatListModule,
    MatTabsModule
    ]
})

export class MaterialModule { }