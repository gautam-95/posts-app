import { NgModule } from '@angular/core';
import {
    MatInputModule, MatCardModule,
    MatButtonModule, MatToolbarModule,
    MatExpansionModule, MatProgressSpinnerModule,
    MatPaginatorModule, MatDialogModule, MatTableModule
} from '@angular/material';

@NgModule({
    imports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule,
        MatTableModule
    ],
    exports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule,
        MatTableModule
    ]
})
export class AngularMaterialModule { }
