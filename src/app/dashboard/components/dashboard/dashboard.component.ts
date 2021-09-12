import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

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
  ) { }

  ngOnInit(): void {
    // if (!localStorage.getItem('foo')) { 
    //   localStorage.setItem('foo', 'no reload') 
    //   location.reload() 
    // } else {
    //   localStorage.removeItem('foo')
    // }
    
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

}
