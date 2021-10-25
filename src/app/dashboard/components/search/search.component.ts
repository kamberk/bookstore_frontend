import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartService } from '../../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isUser = false;
  loadingButton = false;
  searchTerm!: string;
  term!: string;
  URL = "http://localhost:8085";
  books: any;
  page = 1;
  random: any;
  token = localStorage.getItem('token');
  headers = new HttpHeaders()
  .set('x-access-token', `${this.token}`);

  constructor(
    private http: HttpClient,
    private cart: CartService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.http.get(`${this.URL}/api/get-all-books`).subscribe(
      (res: any) => {
        this.books = res;
      },
      (err: any) => {
        console.log(err);
      }
    )
    this.http.get(`${this.URL}/api/get-books/${this.page}`).subscribe(
      (res: any) => {
        console.log(res)
        this.random = res.results;
      },
      (err: any) => {
        console.log(err)
      }
    );
  }

  preusmeri(id: any) {
    this.router.navigate([`/see-more/${id}`])
  }

  addtoCart(id: any, kolicina: any, naslov: any) {
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
    //     console.log(res);
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

}
