import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  tokenForm!: FormGroup;
  isLoading = false;
  eror = false;
  token: any;
  message: any;
  constructor(
    private formBilder: FormBuilder,
    private http: HttpClient,
    private snack: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params.token;
    this.tokenForm = this.formBilder.group({
      token: new FormControl(`${this.token}`)
    }); 
  }
  
  activate() {
    this.isLoading = true;
    this.http.get(`http://localhost:8085/user/activate-acc/${this.token}`).subscribe(
      (res: any) => {
        console.log(res)
        this.isLoading = false;
        this.message = res.message;
        this.snack.open('Uspesno aktiviran nalog!', 'Zatvori!', {
          duration: 5000
        });
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
        this.isLoading = false;
        this.eror = true;
        this.snack.open('Proverite link na mailu i pokusajte opet!', 'Zatvori');
      }
    )
  }

}
