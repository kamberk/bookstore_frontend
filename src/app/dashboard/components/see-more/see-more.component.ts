import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-see-more',
  templateUrl: './see-more.component.html',
  styleUrls: ['./see-more.component.scss']
})
export class SeeMoreComponent implements OnInit {

  isUser = false;
  loadingButton = false;
  isLoading = false;
  id: any;
  knjiga: any;
  message: any;
  quantity = 1;
  ukupno: any;
  token = localStorage.getItem('token');
  headers = new HttpHeaders()
  .set('x-access-token', `${this.token}`);

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private snack: MatSnackBar,
    private cart: CartService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.id = this.activatedRoute.snapshot.params.id;
    this.http.get('http://localhost:8085/api/get-by-id/' + this.id, this.id).subscribe(
      (res: any) => {
        this.knjiga = res;
        this.isLoading = false;
        this.ukupno = res.cena;
      },
      (err: any) => {
        this.message = err.error.message;
        this.snack.open(this.message, 'Close!', {
          duration: 4000
        });
      }
      )
  }

  addtoCart(id: any, naslov: any) {
    this.loadingButton = true;
    const token = localStorage.getItem('token');
    const kolicina = this.quantity;
    if(!token) {
      this.snack.open('Ulogujte se da bi ste dodavali proizvode u korpu!', 'Zatvori!', {
        duration: 5000
      });
      this.loadingButton = false;
    } else {
      this.isUser = true;
      this.cart.addToCart(id, kolicina, naslov).subscribe(
        (res: any) => {
          console.log(res)
        },
        (err: any) => {
          console.log(err)
        },
        () => {
          this.snack.open('Uspesno dodato!', 'Zatvori!', {
            duration: 3000
          })
          this.loadingButton = false;
          if(this.isUser) {
            location.reload();
          }
        }
      )
    //   this.http.post(`http://localhost:8085/cart/add-to-cart/${id}`, {'Kolicina': kolicina, 'naslov': naslov}, {'headers': this.headers}).subscribe(
    //   (res: any) => {
    //     console.log(res)
    //     this.isLoading = false;
    //   },
    //   (err: any) => {
    //     console.log(err)
    //   },
    //   () => {
    //     location.reload();
    //     this.snack.open('Uspesno dodato!', 'Zatvori!', {
    //       duration: 5000
    //     });
    //   }
    // );
    }
  }

  uvecaj() {
    if(this.quantity < this.knjiga.kolicina) {
      this.quantity++;
      this.ukupno = this.knjiga.cena * this.quantity;
    }
  }

  umanji() {
    if(this.quantity >= 2) {
      this.quantity--;
      this.ukupno = this.knjiga.cena * this.quantity;
    }
  }

}
