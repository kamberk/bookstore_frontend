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

  gridColumns = 3;
  user: any;
  token = localStorage.getItem('token');
  books: any;

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    private router: Router,
    private cart: CartService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    
    this.user = JSON.parse(localStorage?.getItem('profile') || '{}');
    this.http.get('http://localhost:8080/api/get-books').subscribe(
      (res: any) => {
        console.log(res)
        this.books = res;
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  preusmeri(id: any) {
    this.router.navigate([`/see-more/${id}`])
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
