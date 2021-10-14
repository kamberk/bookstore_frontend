import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  token = localStorage.getItem('token');
  items: any;
  orderedBooks: any;
  headers = new HttpHeaders()
  .set('x-access-token', `${this.token}`);


  constructor(
    private http: HttpClient,
  ) { }

  public getCartItems() {
   return this.http.get('http://143.198.178.167:8080/cart/get-items', {'headers': this.headers});
  }

  public addToCart(id: any, kolicina: any, naziv: any) {
    const Kolicina = kolicina;
    this.http.post(`http://143.198.178.167:8080/cart/add-to-cart/${id}`, {'Kolicina': Kolicina, 'naslov': naziv}, {'headers': this.headers}).subscribe(
      (res: any) => {
        console.log(res)
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  public clearCart() {
    return this.http.get('http://143.198.178.167:8080/cart/clear', {'headers': this.headers});
  }

  public createOrder(books: any) {
    this.orderedBooks = books;
  }

  public getOrderedItems() {
    return this.orderedBooks;
  }

  public removeOne(id: any) {
    return this.http.get(`http://143.198.178.167:8080/cart/remove/${id}`, {'headers': this.headers});
  }

}
