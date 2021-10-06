import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items: any;

  constructor(
    public cart: CartService
  ) { }

  ngOnInit(): void {
    this.cart.getCartItems().subscribe(
      (res: any) => {
        this.items = res;
      }, 
      (err: any) => {
        console.log(err)
      }
    )
  }

  clear() {
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

}
