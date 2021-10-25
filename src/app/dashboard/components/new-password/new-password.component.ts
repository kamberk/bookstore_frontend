import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  newForm!: FormGroup;
  message: any;
  isLoading = false;

  constructor(
    private formBilder: FormBuilder,
    private http: HttpClient,
    private snack: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.newForm = this.formBilder.group({
      password: new FormControl('', [Validators.required]),
    }); 
  }

  onSubmit() {
    this.isLoading = true;
    const token = this.activatedRoute.snapshot.params.token;
    this.http.post('http://localhost:8085/user/change-password/'+token, this.newForm.value).subscribe(
      (res: any) => {
        console.log(res);
        this.message = res.message;
        this.isLoading = false;
        this.snack.open(this.message, "Zatvori!", {
          duration: 5000
        })
      },
      (err: any) => {
        this.isLoading = true;
        console.log(err.error.message);
        this.message = err.error.message;
        this.isLoading = false;
        this.snack.open(this.message, "Zatvori!", {
          duration: 5000
        })
      },
      () => {
        this.router.navigate(['/login']);
      }
    )
  }

}
