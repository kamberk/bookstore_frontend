import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  isUser = false;
  loadingButton = false;
  items: any;
  isLoading = false;
  quantity = 1;
  ukupno: any;
  total: number = 0;
  books: any;
  URL = "http://localhost:8085";
  token = localStorage.getItem('token');
  headers = new HttpHeaders()
  .set('x-access-token', `${this.token}`);

  constructor(
    public cart: CartService,
    private snack: MatSnackBar,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!localStorage.getItem('profile')) {
      this.router.navigate(['/dashboard']);
    }
    this.isLoading = true;
    this.cart.getCartItems().subscribe(
      (res: any) => {
        this.items = res;
        for(let i = 0; i<res.length; i++) {
          this.total = this.total + parseInt(res[i].cena);
        }
      }, 
      (err: any) => {
        console.log(err)
      }
    )
    this.http.get(`${this.URL}/api/get-books/1`).subscribe(
      (res: any) => {
        this.books = res.results;
        this.isLoading = false;
      },
      (err: any) => {
        console.log(err);
        this.isLoading = false;
      }
    )
  }

  clear() {
    this.isLoading = true;
    this.cart.clearCart().subscribe(
      (res: any) => {
        console.log(res)
        this.isLoading = false;
        location.reload();
      },
      (err: any) => {
        console.log(err.error)
        this.isLoading = false;
      }
    )
  }

  removeOne(id: any) {
    this.isLoading = true;
    this.cart.removeOne(id).subscribe(
      (res: any) => {
        console.log(res);
        this.snack.open('Uklonjeno!', 'Close!', {
          duration: 5000
        });
        this.isLoading = false;
        location.reload();
      },
      (err: any) => {
        console.log(err.error);
        this.isLoading = false;
      }
    )
  }

  addtoCartSugested(id: any, kolicina: any, naslov: any) {
    this.loadingButton = true;
    const token = localStorage.getItem('token');
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
          this.loadingButton = false;
          this.snack.open('Uspesno dodato!', 'Zatvori!', {
            duration: 5000
          });
          if(this.isUser) {
            location.reload();
          }
        }
      )
    }
  }

  preusmeri(id: any) {
    this.router.navigate([`/see-more/${id}`])
  }

  addtoCart(id: any, naslov: any) {
    this.loadingButton = true;
    const token = localStorage.getItem('token');
    const kolicina = this.quantity;
    if(token === null) {
      this.snack.open('Ulogujte se da bi ste dodavali proizvode u korpu!', 'Zatvori!', {
        duration: 5000
      });
      this.loadingButton = true;
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
          this.loadingButton = true;
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

  uvecaj(i: any) {
    if(this.quantity < this.books[i].kolicina) {
      this.quantity++;
      this.ukupno = this.books[i].cena * this.quantity;
      // console.log(this.books[i]);
    }
  }

  umanji(i: any) {
    if(this.quantity >= 2) {
      this.quantity--;
      this.ukupno = this.books[i].cena * this.quantity;
      // console.log(this.books[i]);
    }
  }

  pay() {
    this.cart.createOrder(this.items);
    this.router.navigate([`/purchase/${this.total}`]);
  }

}
