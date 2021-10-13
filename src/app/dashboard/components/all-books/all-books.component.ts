import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  isLoading = false;
  books: any;
  URL = "http://localhost:8080";

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
        // console.log(res)
        this.books = res;
        // console.log(this.books)
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
      this.http.get(`${this.URL}/api/get-by-school/${(event.target as HTMLSelectElement).value}/${this.page}`).subscribe(
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
      this.http.get(`${this.URL}/api/get-by-class/${this.page}/${razred}/none`).subscribe(
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
      this.http.get(`${this.URL}/api/get-by-class/${this.page}/${razred}/${this.selectedSchool}`).subscribe(
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
