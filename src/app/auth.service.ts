import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {IUser} from './interfaces/user.interface';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  loggedUser: IUser;
  private loggedUser$: Subject<IUser> = new Subject<IUser>();

  constructor(private router: Router, private http: HttpClient) {
  }

  login(value: any): Observable<any> {
    return this.http.get(`${environment.api}/login`,
      {params: value}).pipe(tap(() => this.isLoggedIn = true));
  }

  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
    this.loggedUser$.next(null);
  }

  setLoggedUser(user: IUser) {
    this.loggedUser = user;
    this.loggedUser$.next(user);
  }

  loggedUserChange$(): Observable<IUser> {
    return this.loggedUser$;
  }

}
