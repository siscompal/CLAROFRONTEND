// Modulo creado para importar todos los modulos requeridos de material

import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';


import {MatButtonModule}  from '@angular/material/button';
   import {MatCardModule}  from '@angular/material/card';
    import {MatToolbarModule} from '@angular/material/toolbar';
   import { MatInputModule} from '@angular/material/input';
    import {MatSelectModule} from '@angular/material/select';
    import {MatExpansionModule} from '@angular/material/expansion';
    import { MatSidenavModule} from '@angular/material/sidenav';
    import {MatListModule} from '@angular/material/list';
    import {MatTabsModule} from '@angular/material/tabs';
    import {MatTableModule} from '@angular/material/table';
    import {MatPaginatorModule} from '@angular/material/paginator';
    import {MatMenuModule} from '@angular/material/menu';
    import {MatSortModule} from '@angular/material/sort';
    import { MatDialogModule} from '@angular/material/dialog';
    import {MatSnackBarModule} from '@angular/material/snack-bar';
    import {MatRadioModule} from '@angular/material/radio';
    import {MatGridListModule} from '@angular/material/grid-list';
    import {MatTooltipModule} from '@angular/material/tooltip';

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
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule ,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatRadioModule,
    MatGridListModule,
    MatTooltipModule
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
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatRadioModule,
    MatGridListModule,
    MatTooltipModule
    ]
})

export class MaterialModule { }
