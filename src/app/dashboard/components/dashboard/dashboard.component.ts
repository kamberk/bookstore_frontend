import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLoading = false;
  gridColumns = 3;
  user: any;
  token = localStorage.getItem('token');
  books: any;
  page = 1;
  knjigeOsnovna: any;

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    private router: Router,
    private cart: CartService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.user = JSON.parse(localStorage?.getItem('profile') || '{}');
    this.http.get('http://localhost:8080/api/get-by-class/osnovna').subscribe(
      (res: any) => {
        console.log(res.docs);
        this.knjigeOsnovna = res.docs;
        console.log(this.knjigeOsnovna);
      },
      (err: any) => {
        console.log(err);
      }
    )

    this.http.get(`http://localhost:8080/api/get-books/${this.page}`).subscribe(
      (res: any) => {
        console.log(res)
        this.books = res.results;
        console.log(this.books)
        this.isLoading = false;
      },
      (err: any) => {
        console.log(err);
        this.isLoading = false;
      }
    )
    
  }

  preusmeri(id: any) {
    this.router.navigate([`/see-more/${id}`])
  }

  nextPage() {
    this.page++;
    this.http.get(`http://localhost:8080/api/get-books/${this.page}`).subscribe(
      (res: any) => {
        console.log(res)
        if(res.results.length != 0) {
          this.books = res.results;
          this.isLoading = false;
        } else {
          this.snack.open('Stigli ste do poslednje stranice!', 'Zatvori!', {
            duration: 5000
          });
          this.page--;
        }
      },
      (err: any) => {
        console.log(err);
        this.isLoading = false;
      }
    )
  }

  goBack() {
    if(this.page > 1) {
      this.page--;
      this.http.get(`http://localhost:8080/api/get-books/${this.page}`).subscribe(
      (res: any) => {
        console.log(res)
        if(res.results.length != 0) {
          this.books = res.results;
          this.isLoading = false;
        } else {
          this.snack.open('Vec ste na prvoj stranici!', 'Zatvori!', {
            duration: 5000
          });
          this.page++;
        }
      },
      (err: any) => {
        console.log(err);
        this.isLoading = false;
      }
    )
    } else {
      this.snack.open('Vec ste na prvoj stranici!', 'Zatvori!', {
        duration: 5000
      });
    }
  }

  addtoCart(id: any, kolicina: any, naslov: any) {

    const token = localStorage.getItem('token');
    if(!token) {
      this.snack.open('Ulogujte se da bi ste dodavali proizvode u korpu!', 'Close!', {
        duration: 5000
      });
    } else {
      this.cart.addToCart(id, kolicina, naslov);
      this.snack.open('Uspesno dodato!', 'Close!', {
        duration: 5000
      });
      location.reload();
    }
  }

}
