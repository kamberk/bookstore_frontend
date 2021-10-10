import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WrapperComponent implements OnInit {

  expanded: Boolean = false;
  user = JSON.parse(localStorage.getItem('profile') || '{}');
  token = localStorage.getItem('token');
  cartItems: any;
  ukupno = 0;

  constructor(
    private router: Router,
    public auth: AuthService,
    public cart: CartService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    // this.router.navigate(['/dashboard']);
    const token = localStorage.getItem('token');
    console.log(this.user);
    if(token) {
      this.cart.getCartItems().subscribe(
        (res: any) => {
          // console.log(res)
          this.cartItems = res;
          console.log(this.cartItems);
          for(let i=0; i<this.cartItems.length; i++) {
            console.log(this.cartItems[i].cena)
            this.ukupno+= parseInt(this.cartItems[i].cena);
          }
        },
        (err: any) => {
          console.log(err.error);
        }
      )
    } else {
      this.cartItems = 0;
    }
    // this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    this.auth.deauthenticate();
    this.router.navigate(['/login']);
  }

  isprazni() {
    this.cart.clearCart().subscribe(
      (res: any) => {
        console.log(res)
        location.reload();
      },
      (err: any) => {
        console.log(err.error)
      }
    )
  }

  removeOne(id: any) {
    this.cart.removeOne(id).subscribe(
      (res: any) => {
        console.log(res);
        this.snack.open('Uklonjeno!', 'Close!', {
          duration: 5000
        });
        location.reload();
      },
      (err: any) => {
        console.log(err.error);
      }
    )
  }

}
