import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-remove-row',
  templateUrl: './remove-row.component.html',
  styleUrls: ['./remove-row.component.scss']
})
export class RemoveRowComponent {

  constructor(private dialogRef: MatDialogRef<RemoveRowComponent>) {
  }

  submit() {
    this.dialogRef.close(true);
  }
}
