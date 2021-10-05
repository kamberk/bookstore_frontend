import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-see-more',
  templateUrl: './see-more.component.html',
  styleUrls: ['./see-more.component.scss']
})
export class SeeMoreComponent implements OnInit {

  isLoading = false;
  id: any;
  knjiga: any;
  message: any;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.id = this.activatedRoute.snapshot.params.id;
    console.log(this.id);
    this.http.get('http://localhost:8080/api/get-by-id/' + this.id, this.id).subscribe(
      (res: any) => {
        console.log(res);
        this.knjiga = res;
      },
      (err: any) => {
        console.log(err)
        
      }
    )
  }


}
