import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itemsNumber = new BehaviorSubject<number>(0);
  itemsInCart$: Observable<number> = this.itemsNumber.asObservable()
  token = localStorage.getItem('token');
  items: any;
  orderedBooks: any;
  headers = new HttpHeaders()
  .set('x-access-token', `${this.token}`);


  constructor(
    private http: HttpClient,
  ) { }

  public getCartItems() {
   return this.http.get('http://localhost:8085/cart/get-items', {'headers': this.headers});
  }

  public addToCart(id: any, kolicina: any, naziv: any) {
    const Kolicina = kolicina;
    return this.http.post(`http://localhost:8085/cart/add-to-cart/${id}`, {'Kolicina': Kolicina, 'naslov': naziv}, {'headers': this.headers});
  }

  public clearCart() {
    return this.http.get('http://localhost:8085/cart/clear', {'headers': this.headers});
  }

  public createOrder(books: any) {
    this.orderedBooks = books;
  }

  public getOrderedItems() {
    return this.orderedBooks;
  }

  public removeOne(id: any) {
    return this.http.get(`http://localhost:8085/cart/remove/${id}`, {'headers': this.headers});
  }

}
