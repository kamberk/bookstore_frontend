import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from '../../cart.service';

interface Skola {
  value: string;
  viewValue: string;
}

interface Razred {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss']
})
export class AllBooksComponent implements OnInit {

  isUser = false;
  isLoading = false;
  books: any;
  URL = "http://localhost:8085";

  skola: Skola[] = [
    {value: 'osnovna', viewValue: 'Osnovna'},
    {value: 'srednja', viewValue: 'Srednja'},
    {value: 'predskolsko', viewValue: 'Predskolsko'}
  ];
  razred: Razred[] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'}    
  ]
  selectedClass = '';
  selectedSchool = '';
  page = 1;
  token = localStorage.getItem('token');
  headers = new HttpHeaders()
  .set('x-access-token', `${this.token}`);

  noBooks = false;

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
    private router: Router,
    private cart: CartService
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
  }

  selectSchool(event: Event) {
    this.isLoading = true;
    this.selectedSchool = (event.target as HTMLSelectElement).value;
    if (this.selectedSchool === "") {
      this.http.get(`${this.URL}/api/get-all-books`).subscribe(
        (res: any) => {
          this.books = res;
          this.isLoading = false;
          if(this.books.length === 0) {
            this.noBooks = true;
          }
        },
        (err: any) => {
          console.log(err);
        }
      )
    } else {
      this.http.get(`${this.URL}/api/get-all-by-school/${(event.target as HTMLSelectElement).value}`).subscribe(
        (res: any) => {
          this.books = res 
          if(this.books.length === 0) {
            this.noBooks = true;
          }
          this.isLoading = false;
        },
        (err: any) => {
          console.log(err);
        }
      )
    }
  }

  selectClass(event: Event) {
    this.isLoading = true;
    this.selectedClass = (event.target as HTMLSelectElement).value;
    const razred = parseInt(this.selectedClass);
    if(this.selectedSchool === '') {
      this.http.get(`${this.URL}/api/get-all-by-class/${razred}/none`).subscribe(
        (res: any) => {
          this.books = res;
          if(this.books.length === 0) {
            this.noBooks = true;
          }
          this.isLoading = false;
        }, 
        (err: any) => {
          console.log(err)
        }
      )
    } else if (this.selectedClass === '') {
      this.http.get(`${this.URL}/api/get-all-books`).subscribe(
        (res: any) => {
          this.books = res;
          if(this.books.length === 0) {
            this.noBooks = true;
          }
          this.isLoading = false;
        },
        (err: any) => {
          console.log(err);
        }
      )
    } else {
      this.http.get(`${this.URL}/api/get-all-by-class/${razred}/${this.selectedSchool}`).subscribe(
        (res: any) => {
          console.log(res)
          this.books = res;
          if(this.books.length === 0) {
            this.noBooks = true;
          }
          this.isLoading = false;
        },
        (err: any) => {
          console.log(err);
        }
      )
    }
  }

preusmeri(id: any) {
  this.router.navigate([`/see-more/${id}`])
}

addtoCart(id: any, kolicina: any, naslov: any) {
  const token = localStorage.getItem('token');
  if(token === null) {
    this.snack.open('Ulogujte se da bi ste dodavali proizvode u korpu!', 'Zatvori!', {
      duration: 5000
    });
  } else {
      this.isLoading = true;
      this.isUser = true;
      this.cart.addToCart(id, kolicina, naslov).subscribe(
        (res: any) => {
          console.log(res)
          this.isLoading = false
          this.isUser = true
        },
        (err: any) => {
          console.log(err)
          this.isLoading = false
          this.isUser = false
        },
        () => {
          this.snack.open('Uspesno dodato!', 'Zatvori!', {
            duration: 3000
          })
          this.isLoading = false;
          if(this.isUser) {
            location.reload();
          }
        }
      )
    }
}

}
