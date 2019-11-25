import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IUser} from '../../interfaces/user.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ISelect} from '../../interfaces/select.interface';

@Component({
  selector: 'app-add-edit-row',
  templateUrl: './add-edit-row.component.html',
  styleUrls: ['./add-edit-row.component.scss']
})
export class AddEditRowComponent {

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    department: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
  });

  departments: ISelect[] = [
    {value: 1, label: 'Kadry'},
    {value: 2, label: 'Zarząd'},
    {value: 3, label: 'IT'},
    {value: 4, label: 'Finanse'},
    {value: 5, label: 'Ochrona'},
  ];

  department: ISelect;

  positions: ISelect[] = [
    {value: 1, label: 'Programista'},
    {value: 2, label: 'CEO'},
    {value: 3, label: 'Administrator'},
    {value: 4, label: 'Ochroniarz'},
    {value: 5, label: 'HR specialist'},
    {value: 6, label: 'Referent ds. finansów'},
  ];
  position: ISelect;

  types: string[] = ['Użytkownik', 'Administrator'];
  type: string;

  submit() {
    this.dialogRef.close(this.form.value);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'edit' | 'add', userData?: IUser },
    private dialogRef: MatDialogRef<AddEditRowComponent>) {

    if (this.data.userData) {
      this.department = this.departments
        .find((dep: ISelect) => dep.label === this.data.userData.department);
      this.position = this.positions
        .find((pos: ISelect) => pos.label === this.data.userData.position);
      this.type = this.types
        .find((typ: string) => typ === this.data.userData.type);

      this.form.patchValue({
        id: this.data.userData.id,
        firstname: this.data.userData.firstname,
        lastname: this.data.userData.lastname,
        email: this.data.userData.email,
        department: this.department.value,
        position: this.position.value,
        type: this.type
      });
    }
  }
}
