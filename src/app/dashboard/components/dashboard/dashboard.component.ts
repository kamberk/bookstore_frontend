import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLoading = false;
  loading = false;
  gridColumns = 3;
  user: any;
  token = localStorage.getItem('token');
  headers = new HttpHeaders()
  .set('x-access-token', `${this.token}`);
  books: any;
  page = 1;
  pageSrednja = 1;
  pageKlet = 1;
  pageEduka = 1;
  pageLogos = 1;
  pagePred = 1;
  Klett: any;
  Eduka: any;
  Logos: any;
  predskolsko: any;
  knjigeOsnovna: any;
  knjigeSrednja: any;
  URL = "http://143.198.178.167:8080";
  emailForm!: FormGroup;

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    private router: Router,
    private cart: CartService,
    private snack: MatSnackBar,
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.emailForm = this.builder.group({
      email: new FormControl('', Validators.required)
    });

    this.isLoading = true;
    this.user = JSON.parse(localStorage?.getItem('profile') || '{}');
    this.http.get(`${this.URL}/api/get-by-school/osnovna/${this.page}`).subscribe(
      (res: any) => {
        this.knjigeOsnovna = res 
        this.isLoading = false;
      },
      (err: any) => {
        console.log(err);
      }
    )
    this.http.get(`${this.URL}/api/get-by-school/srednja/${this.page}`).subscribe(
      (res: any) => {
        this.knjigeSrednja = res;
      },
      (err: any) => {
        console.log(err);
      }
    )
    this.http.get(`${this.URL}/api/get-by-school/predskolsko/${this.page}`).subscribe(
      (res: any) => {
        this.predskolsko = res;
        this.isLoading = false;
      },
      (err: any) => {
        console.log(err);
      }
    )    
    this.http.get(`${this.URL}/api/get-by-publisher/${this.page}/Eduka`).subscribe(
      (res: any) => {
        this.Eduka = res;
      },
      (err: any) => {
        console.log(err);
      }
    );   
    this.http.get(`${this.URL}/api/get-by-publisher/1/Klett`).subscribe(
      (res: any) => {
        this.Klett = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
    this.http.get(`${this.URL}/api/get-by-publisher/1/Novi Logos`).subscribe(
      (res: any) => {
        this.Logos = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    console.log(this.emailForm.value);
    this.loading = true;
    this.http.post(`${this.URL}/user/subscribe`, this.emailForm.value).subscribe(
      (res: any) => {
        console.log(res);
        const message = res.message;
        this.snack.open(message, 'Zatvori!', {
          duration: 3000
        });
        this.loading = false;
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

  nextPagePred() {
    this.pagePred++;
    this.http.get(`${this.URL}/api/get-by-school/predskolsko/${this.pagePred}`).subscribe(
      (res: any) => {
        if(res.length != 0) {
          this.predskolsko = res;
          this.isLoading = false;
        } else {
          this.snack.open('Stigli ste do poslednje stranice!', 'Zatvori!', {
            duration: 5000
          });
          this.pagePred--;
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

  goBackPred() {
    if(this.pagePred > 1) {
      this.pagePred--;
      this.http.get(`${this.URL}/api/get-by-school/osnovna/${this.pagePred}`).subscribe(
      (res: any) => {
        if(res.length != 0) {
          this.predskolsko = res;
          this.isLoading = false;
        } else {
          this.snack.open('Vec ste na prvoj stranici!', 'Zatvori!', {
            duration: 5000
          });
          this.pagePred++;
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

  nextPageKlett() {
    this.pageKlet++;
    this.http.get(`${this.URL}/api/get-by-publisher/${this.pageKlet}/Klett`).subscribe(
      (res: any) => {
        if(res.length != 0) {
          this.Klett = res;
          this.isLoading = false;
        } else {
          this.snack.open('Stigli ste do poslednje stranice!', 'Zatvori!', {
            duration: 5000
          });
          this.pageKlet--;
        }
      },
      (err: any) => {
        console.log(err);
        this.isLoading = false;
      }
    )
  }

  nextPageLogos() {
    this.pageLogos++;
    this.http.get(`${this.URL}/api/get-by-publisher/${this.pageLogos}/Novi Logos`).subscribe(
      (res: any) => {
        if(res.length != 0) {
          this.Logos = res;
          this.isLoading = false;
        } else {
          this.snack.open('Stigli ste do poslednje stranice!', 'Zatvori!', {
            duration: 5000
          });
          this.pageLogos--;
        }
      },
      (err: any) => {
        console.log(err);
        this.isLoading = false;
      }
    )
  }

  nextPageEduka() {
    this.pageEduka++;
    this.http.get(`${this.URL}/api/get-by-publisher/${this.pageEduka}/Eduka`).subscribe(
      (res: any) => {
        if(res.length != 0) {
          this.Eduka = res;
          this.isLoading = false;
        } else {
          this.snack.open('Stigli ste do poslednje stranice!', 'Zatvori!', {
            duration: 5000
          });
          this.pageEduka--;
        }
      },
      (err: any) => {
        console.log(err);
        this.isLoading = false;
      }
    )
  }

  goBackKlett() {
    if(this.pageKlet > 1) {
      this.pageKlet--;
      this.http.get(`${this.URL}/api/get-by-publisher/${this.pageKlet}/Klett`).subscribe(
      (res: any) => {
        if(res.length != 0) {
          this.Klett = res;
          this.isLoading = false;
        } else {
          this.snack.open('Vec ste na prvoj stranici!', 'Zatvori!', {
            duration: 5000
          });
          this.pageKlet++;
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

  goBackLogos() {
    if(this.pageLogos > 1) {
      this.pageLogos--;
      this.http.get(`${this.URL}/api/get-by-publisher/${this.pageLogos}/Novi Logos`).subscribe(
      (res: any) => {
        if(res.length != 0) {
          this.Logos = res;
          this.isLoading = false;
        } else {
          this.snack.open('Vec ste na prvoj stranici!', 'Zatvori!', {
            duration: 5000
          });
          this.pageLogos++;
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

  goBackEduka() {
    if(this.pageEduka > 1) {
      this.pageEduka--;
      this.http.get(`${this.URL}/api/get-by-publisher/${this.pageEduka}/Eduka`).subscribe(
      (res: any) => {
        if(res.length != 0) {
          this.Eduka = res;
          this.isLoading = false;
        } else {
          this.snack.open('Vec ste na prvoj stranici!', 'Zatvori!', {
            duration: 5000
          });
          this.pageEduka++;
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
    this.isLoading = true;
    // const token = localStorage.getItem('token');
    if(!this.token) {
      this.snack.open('Ulogujte se da bi ste dodavali proizvode u korpu!', 'Zatvori!', {
        duration: 5000
      });
      location.reload();
    } else {
      // this.cart.addToCart(id, kolicina, naslov);
      this.http.post(`http://143.198.178.167:8080/cart/add-to-cart/${id}`, {'Kolicina': kolicina, 'naslov': naslov}, {'headers': this.headers}).subscribe(
      (res: any) => {
        console.log(res)
        this.isLoading = false;
      },
      (err: any) => {
        console.log(err)
      },
      () => {
        location.reload();
        this.snack.open('Uspesno dodato!', 'Zatvori!', {
          duration: 5000
        });
      }
    );
    }
  }

}
