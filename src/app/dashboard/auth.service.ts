import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authenticated = new BehaviorSubject<boolean>(this.cookie.check('token'));

  constructor(
    private cookie: CookieService,
    private router: Router
  ) { }

    public authenticate(token: string) {
      this.cookie.set('token', token);
      this.authenticated.next(true);
      
    }

    public deauthenticate(){
      this.cookie.delete('token');
      this.authenticated.next(false);
    }

}
