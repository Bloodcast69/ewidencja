import {Component, HostListener} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {IUser} from '../interfaces/user.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email]
    )),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])),
  });

  loading = false;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  @HostListener('keyup.Enter') onEnterKeyUp() {
    if (this.form.valid) {
      this.submitForm();
    }
  }

  submitForm() {
    this.loading = true;
    this.authService.login(this.form.value).subscribe((user: IUser) => {
      this.authService.setLoggedUser(user);
      this.loading = false;
      this.router.navigate(['/main']);
    });
  }
}
