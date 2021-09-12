import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide = true;
  isLoading = false;

  signupForm!: FormGroup;

  roles: string[] = ['student', 'teacher'];
  choosenRole: any;
  eror: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  onSubmit(){
    this.isLoading = true;
    this.http.post('http://localhost:8080/user/signup', this.signupForm.value).subscribe(
      (res:any) => {
        console.log(res);
        this.isLoading = false;
        this.snack.open('Please activate your account! Check your email', 'Close!', {
          duration: 50000
        })
      },
      err=>{
        console.log(err.error.message);
        this.eror = err.error.message;
        this.isLoading = false;
        this.snack.open(this.eror, 'Close!', {
          duration: 50000,
        })
      }
    )
    this.signupForm.reset();
  }

}
