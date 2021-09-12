import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  isLoading = false;
  token: any;
  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  
  async activate(): Promise<void> {
    console.log('pressed')
    this.isLoading = true;
    this.token = this.activatedRoute.snapshot.params.token;
    if(this.token){      
      await this.http.get('http://localhost:8080/user/activate-acc/'+this.token).subscribe(
        res => {
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
      }
      setTimeout( () => {
        this.isLoading = true;
        this.snack.open('Accout activated successfully', 'Close!', {
          duration: 5000
        });
        this.router.navigate(['/login']);
      }, 2000);
  }

}
