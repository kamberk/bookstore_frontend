import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-purchase-two',
  templateUrl: './purchase-two.component.html',
  styleUrls: ['./purchase-two.component.scss']
})
export class PurchaseTwoComponent implements OnInit {

  nacinPlacanja: any;
  kartica: Boolean = false;
  total: number = 0;
  token = localStorage.getItem('token');
  headers= new HttpHeaders()
   .set('x-access-token', `${this.token}`);

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    this.nacinPlacanja = this.activatedRoute.snapshot.params.way;
    this.total = this.activatedRoute.snapshot.params.total;
    console.log(this.nacinPlacanja);
    if(this.nacinPlacanja === 'kartica') {
      this.kartica = true;
    } else {
      this.kartica = false;
    }
  }

  pay() {
    this.http.post(`http://localhost:8080/cart/create-order/${this.total}`, {}, {headers: this.headers}).subscribe(
            (res: any) => {
              console.log(res)
              this.snack.open('Uspesno naruceno!', 'Zatvori!', {
                duration: 5000
              });
              this.router.navigate([`/thank-you`]);
              location.reload();
            },
            (err: any) => {
              console.log(err)
            }
          )
  }

}
