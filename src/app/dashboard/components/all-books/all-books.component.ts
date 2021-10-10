import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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

  constructor(
    private http: HttpClient,
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
  }

  selectSchool(event: Event) {
    this.isLoading = true;
    this.selectedSchool = (event.target as HTMLSelectElement).value;
    if (this.selectedSchool === "") {
      this.http.get(`${this.URL}/api/get-all-books`).subscribe(
        (res: any) => {
          // console.log(res)
          this.books = res;
          this.isLoading = false;
          // console.log(this.books)
        },
        (err: any) => {
          console.log(err);
        }
      )
    }
    this.http.get(`${this.URL}/api/get-by-school/${(event.target as HTMLSelectElement).value}/${this.page}`).subscribe(
      (res: any) => {
        console.log(res);
        this.books = res 
        console.log(this.books);
        this.isLoading = false;
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  selectClass(event: Event) {
    this.isLoading = true;
    this.selectedClass = (event.target as HTMLSelectElement).value;
    const razred = parseInt(this.selectedClass);
    if(this.selectedSchool === '') {
      this.http.get(`${this.URL}/api/get-by-class/${this.page}/${razred}/none`).subscribe(
        (res: any) => {
          this.books = res;
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
          this.isLoading = false;
        },
        (err: any) => {
          console.log(err);
        }
      )
    }
    else {
      this.http.get(`${this.URL}/api/get-by-class/${this.page}/${razred}/${this.selectedSchool}`).subscribe(
        (res: any) => {
          console.log(res)
          this.books = res;
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

}

}
