import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  
  searchTerm!: string;
  term!: string;
  URL = "http://localhost:8080";
  books: any;
  page = 1;
  random: any;

  constructor(
    private http: HttpClient,
    private cart: CartService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.http.get(`${this.URL}/api/get-all-books`).subscribe(
      (res: any) => {
        // console.log(res)
        this.books = res;
        // console.log(this.books)
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

}
