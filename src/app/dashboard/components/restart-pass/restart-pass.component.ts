import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restart-pass',
  templateUrl: './restart-pass.component.html',
  styleUrls: ['./restart-pass.component.scss']
})
export class RestartPassComponent implements OnInit {

  
  restartForm!: FormGroup;
  message: any;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.restartForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
    }); 
  }

  onSubmit() {
    this.isLoading = true;
    console.log(this.restartForm.value.email);
    this.http.post('http://localhost:8080/user/restart-password', this.restartForm.value).subscribe(
      (res: any) => {
        console.log(res.message);
        this.message = res.message;
        this.restartForm.reset();
        this.isLoading = false;
        this.snack.open(this.message, "Close!", {
          duration: 5000
        })
      },
      (err: any) => {
        this.isLoading = true;
        console.log(err.error.message);
        this.message = err.error.message;
        this.isLoading = false;
        this.snack.open(this.message, "Close!", {
          duration: 5000
        })
      }
    )
  }

}
