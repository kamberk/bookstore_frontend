import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items: any;
  isLoading = false;
  books: any;
  URL = "http://localhost:8080";

  constructor(
    public cart: CartService,
    private snack: MatSnackBar,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.cart.getCartItems().subscribe(
      (res: any) => {
        this.items = res;
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

  addtoCart(id: any, kolicina: any, naslov: any) {
    const token = localStorage.getItem('token');
    if(!token) {
      this.snack.open('Ulogujte se da bi ste dodavali proizvode u korpu!', 'Zatvori!', {
        duration: 5000
      });
    } else {
      this.cart.addToCart(id, kolicina, naslov);
      this.snack.open('Uspesno dodato!', 'Zatvori!', {
        duration: 5000
      });
      location.reload();
    }
  }

  preusmeri(id: any) {
    this.router.navigate([`/see-more/${id}`])
  }

}
