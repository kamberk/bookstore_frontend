import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authen= new BehaviorSubject<boolean>(false);
  authenticated$: Observable<boolean> = this.authen.asObservable();

  constructor(
    private cookie: CookieService,
    private router: Router
  ) { }

    checkUser() {
      const token = localStorage.getItem('token');
      if(token === null) {
        this.authen.next(false)
      } else {
        this.authen.next(true)
      }
    }

    public authenticate(token: string) {
      this.cookie.set('token', token);
      this.authen.next(true);      
      this.router.navigate(['/dashboard']);
    }

    public deauthenticate(){
      this.cookie.delete('token');
      this.authen.next(false);
    }

}
