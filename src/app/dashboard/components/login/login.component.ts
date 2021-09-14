import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    private snack: MatSnackBar
  ) { }

  async ngOnInit(): Promise<void> {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });  
  }

  onSubmit() {
    if(!this.loginForm.valid) {
      this.eror = "Please fill all fields!"
      this.snack.open(this.eror, "Close!", {
        duration: 3000
      });
    } else {
      this.isLoading = true;
      this.http.post('http://localhost:8080/user/signin', this.loginForm.value).subscribe(
        (res: any) => {
          localStorage.setItem('profile', JSON.stringify(res.result));
          localStorage.setItem('token', res.token);
          this.auth.authenticate(res.token);
          this.router.navigate(['/dashboard']);
          this.isLoading = false;
        },
        (err: any) => {
          this.eror = err.error.message;
          this.isLoading = false;
        }
        )
        }
  }

}