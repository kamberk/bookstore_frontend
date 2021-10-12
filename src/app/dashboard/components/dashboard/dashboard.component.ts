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
  pageSrednja = 1;
  knjigeOsnovna: any;
  knjigeSrednja: any;
  predskolsko: any;
  URL = "http://localhost:8080";

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
    this.http.get(`${this.URL}/api/get-by-school/osnovna/${this.page}`).subscribe(
      (res: any) => {
        console.log(res);
        this.knjigeOsnovna = res 
        console.log(this.knjigeOsnovna);
        this.isLoading = false;
      },
      (err: any) => {
        console.log(err);
      }
    )
    this.http.get(`${this.URL}/api/get-by-school/srednja/${this.page}`).subscribe(
      (res: any) => {
        console.log(res);
        this.knjigeSrednja = res;
      },
      (err: any) => {
        console.log(err);
      }
    )
    this.http.get(`${this.URL}/api/get-by-school/predskolsko/${this.page}`).subscribe(
      (res: any) => {
        console.log(res);
        this.predskolsko = res;
        this.isLoading = false;
      },
      (err: any) => {
        console.log(err);
      }
    )    
  }

  preusmeri(id: any) {
    this.router.navigate([`/see-more/${id}`])
  }

  nextPageOsnovna() {
    this.page++;
    this.http.get(`${this.URL}/api/get-by-school/osnovna/${this.page}`).subscribe(
      (res: any) => {
        console.log(res)
        if(res.length != 0) {
          this.knjigeOsnovna = res;
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

  goBackOsnovna() {
    if(this.page > 1) {
      this.page--;
      this.http.get(`${this.URL}/api/get-by-school/osnovna/${this.page}`).subscribe(
      (res: any) => {
        console.log(res)
        if(res.length != 0) {
          this.knjigeOsnovna = res;
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

  goBackSrednja() {
    if(this.pageSrednja > 1) {
      this.pageSrednja--;
      this.http.get(`${this.URL}/api/get-by-school/srednja/${this.pageSrednja}`).subscribe(
      (res: any) => {
        console.log(res)
        if(res.length != 0) {
          this.knjigeSrednja = res;
          this.isLoading = false;
        } else {
          this.snack.open('Vec ste na prvoj stranici!', 'Zatvori!', {
            duration: 5000
          });
          this.pageSrednja++;
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

  nextPageSrednja() {
    this.pageSrednja++;
    this.http.get(`${this.URL}/api/get-by-school/srednja/${this.pageSrednja}`).subscribe(
      (res: any) => {
        console.log(res)
        if(res.length != 0) {
          this.knjigeSrednja = res;
          this.isLoading = false;
        } else {
          this.snack.open('Stigli ste do poslednje stranice!', 'Zatvori!', {
            duration: 5000
          });
          this.pageSrednja--;
        }
      },
      (err: any) => {
        console.log(err);
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

}
