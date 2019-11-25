import {Component, ViewChild} from '@angular/core';
import {IUser} from '../interfaces/user.interface';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {AddEditRowComponent} from '../shared/add-edit-row/add-edit-row.component';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RemoveRowComponent} from '../shared/remove-row/remove-row.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  @ViewChild('table', {static: true}) table: any;
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'department', 'position', 'type', 'actions'];
  dataSource: MatTableDataSource<IUser>;

  loading = false;

  constructor(private dialog: MatDialog, private http: HttpClient) {
    this.loading = true;
    this.http.get(`${environment.api}/users`).subscribe(({employees}: { employees: IUser[] }) => {
      this.dataSource = new MatTableDataSource(employees);
      this.loading = false;
    });
  }

  addNewRow() {
    const dialog = this.dialog.open(AddEditRowComponent, {
      data: {
        mode: 'add'
      }
    });
    dialog.afterClosed().subscribe((result: IUser) => {
      const {firstname, lastname, email, department, position, type} = result;
      this.http.post(`${environment.api}/users/add`,
        {
          firstname,
          lastname,
          email,
          department,
          position,
          type
        })
        .subscribe((users: IUser[]) => this.dataSource.data = users);
    });
  }

  editRow(row: IUser) {
    const dialog = this.dialog.open(AddEditRowComponent, {
      data: {
        mode: 'edit',
        userData: row
      }
    });

    dialog.afterClosed().subscribe((result: IUser) => {
      if (!result) {
        return;
      }

      this.http.put(`${environment.api}/users/${result.id}`, result)
        .subscribe((users: IUser[]) => this.dataSource.data = users);
    });
  }

  removeRow(row: IUser) {
    const dialog = this.dialog.open(RemoveRowComponent);

    dialog.afterClosed().subscribe((result: boolean) => {
      if (!result) {
        return;
      }

      this.http.delete(`${environment.api}/users/${row.id}`)
        .subscribe((users: IUser[]) => this.dataSource.data = users);
    });
  }
}
