import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ConfDialogComponent } from '../conf-dialog/conf-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isLoading = false;
  message: any;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  forma!: FormGroup;
  isEditable = false;
  user = JSON.parse(localStorage.getItem('profile') || '');
  token = localStorage.getItem('token');
  headers= new HttpHeaders()
  .set('x-access-token', `${this.token}`);

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [`${this.user.email}`, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [`${this.user?.ulica}`, Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: [`${this.user?.grad}`, Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: [`${this.user?.zipcode}`, Validators.required],
    });
    
  }

  onSubmit() {
    
    this.isLoading = true;
    localStorage.setItem('code', this.fourthFormGroup.value.fourthCtrl);
    this.forma = this._formBuilder.group({
      ulica: [`${this.secondFormGroup.value.secondCtrl}`],
      opstina: [`${this.thirdFormGroup.value.thirdCtrl}`],
      zipcode: [`${this.fourthFormGroup.value.fourthCtrl}`]
    });
    console.log(this.forma.value);
    this.http.post('http://143.198.178.167:8080/user/delivery-info', this.forma.value, {headers: this.headers}).subscribe(
      (res: any) => {
        console.log(res)
        this.isLoading = false;
        this.message = res.message;
        this.snack.open(this.message, 'Close!', {
          duration: 5000
        });
      },
      (err: any) => {
        console.log(err)
        this.isLoading = false;
      }
    )
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfDialogComponent, {
      data: {
        message: 'Are you sure you want to delete your account?',
        buttonText: {
          ok: 'Delete!',
          cancel: 'Cancel'
        }
      }
    })
    this.isLoading = true;
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.http.delete('http://143.198.178.167:8080/user/deleteUser', {headers: this.headers}).subscribe(
          (res: any) => {
            this.message = res.message;
            this.snack.open(this.message, 'Close!', {
              duration: 5000
            });
            this.isLoading = false;
            localStorage.removeItem('token');
            localStorage.removeItem('profile');
            this.auth.deauthenticate();
            this.router.navigate(['/register']);
          },
          (err: any) => {
            this.message = err.error.message;
            this.snack.open(this.message, 'Close!', {
              duration: 5000
            });
            this.isLoading = false;
          }
        )
      } else {
        this.isLoading = false;
      }
    })
  }

}
