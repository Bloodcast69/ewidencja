import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatCheckboxModule,
  MatCardModule,
  MatMenuModule,
  MatDialogModule,
  MatDividerModule,
  MatSelectModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { RemoveRowComponent } from './remove-row/remove-row.component';
import { AddEditRowComponent } from './add-edit-row/add-edit-row.component';
import {ReactiveFormsModule} from '@angular/forms';

const MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatCheckboxModule,
  MatCardModule,
  MatMenuModule,
  MatDialogModule,
  MatDividerModule,
  MatSelectModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [RemoveRowComponent, AddEditRowComponent],
  imports: [
    CommonModule,
    MODULES,
    ReactiveFormsModule
  ],
  exports: [MODULES]
})
export class SharedModule {
}
