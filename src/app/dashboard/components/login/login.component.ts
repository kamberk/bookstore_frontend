import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  hide = true;
  loginForm!: FormGroup;
  eror: any;
  token = localStorage.getItem('token');

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private snack: MatSnackBar,
    private cookie: CookieService
  ) { }

  async ngOnInit(): Promise<void> {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    }); 
    if(localStorage.getItem('token') && localStorage.getItem('foo')) {
      this.router.navigate(['/dashboard']);
      localStorage.removeItem('foo')
    } else {
      localStorage.setItem('foo', 'no reload');
    }
  }

  onSubmit() {
    if(!this.loginForm.valid) {
      this.eror = "Please fill all fields!"
      this.snack.open(this.eror, "Close!", {
        duration: 3000
      });
    } else {
      this.isLoading = true;
      this.http.post('http://143.198.178.167:8080/user/signin', this.loginForm.value).subscribe(
        (res: any) => {
          localStorage.setItem('profile', JSON.stringify(res.result));
          localStorage.setItem('token', res.token);
          this.cookie.set('token', res.token);
          this.auth.authenticate(res.token);
          this.isLoading = false;
        },
        (err: any) => {
          this.eror = err.error.message;
          this.isLoading = false;
        },
        () => {
          location.reload();
        }
        )
        }
  }

}