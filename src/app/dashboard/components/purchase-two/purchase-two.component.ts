import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../cart.service';


interface Order {
  naziv: string
}

@Component({
  selector: 'app-purchase-two',
  templateUrl: './purchase-two.component.html',
  styleUrls: ['./purchase-two.component.scss']
})
export class PurchaseTwoComponent implements OnInit {

  isLoading = false;
  naruceno: Order[] = [];
  nacinPlacanja: any;
  kartica: Boolean = false;
  eror = false;
  total: number = 0;
  token = localStorage.getItem('token');
  headers= new HttpHeaders()
   .set('x-access-token', `${this.token}`);

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private snack: MatSnackBar,
    private router: Router,
    private cart: CartService
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    this.cart.getCartItems().subscribe(
      (res: any) => {
        for(let i=0; i<res.length; i++) {
          this.naruceno.push(res[i].naziv);
        }
        console.log(this.naruceno);
      },
      (err: any) => {
        console.log(err)
      }
    );
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
    // this.isLoading = true;
    var number = (<HTMLInputElement>document.getElementById('number')).value;
    var name = (<HTMLInputElement>document.getElementById('name')).value;
    var sdate = (<HTMLInputElement>document.getElementById('sdate')).value;
    var expdate = (<HTMLInputElement>document.getElementById('expdate')).value;
    var passw = (<HTMLInputElement>document.getElementById('passw')).value;
    if(!number || !name || !sdate || !expdate || !passw ) {
      this.eror = true;
    } else {
      this.isLoading = true;
      this.http.post(`http://localhost:8085/cart/create-order/${this.total}`, {naruceno: this.naruceno}, {headers: this.headers}).subscribe(
              (res: any) => {
                console.log(res)
                this.snack.open('Uspesno naruceno!', 'Zatvori!', {
                  duration: 5000
                });
                this.isLoading = false;
                this.router.navigate([`/thank-you`]);
              },
              (err: any) => {
                console.log(err)
                this.isLoading = false;
              },
              ()=> {
                this.isLoading = false;
                location.reload();
              }
            )
    }
  }

}
