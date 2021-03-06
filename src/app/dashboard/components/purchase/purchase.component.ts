import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CartService } from '../../cart.service';


interface NacinPlacanja {
  value: string;
  viewValue: string;
}

interface Order {
  naziv: string
}


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  naciniPlacanja: NacinPlacanja[] = [
    {value: 'kartica', viewValue: 'Kartica'},
    {value: 'pouzecem', viewValue: 'Placanje pouzecem'}
  ];

  selectedWay = 'kartica';
  naruceno: Order[] = [];
  errMsg: any;
  selected: Boolean = false;
  isLoading = false;
  message: any;
  total: number = 0;
  ordered: any;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  fifthFormGroup!: FormGroup;
  forma!: FormGroup;
  isEditable = false;
  user: any;
  headers: any;
  token: any;
  items: any;

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private cart: CartService
  ) { }

  ngOnInit(): void {
    // this.ordered = this.cart.getOrderedItems();
    this.cart.getCartItems().subscribe(
      (res: any) => {
        for(let i=0; i<res.length; i++) {
          this.naruceno.push(res[i].naziv);
        }
        console.log(this.naruceno);
      },
      (err: any) => {
        console.log(err)
      }
    );
    
    this.total = this.activatedRoute.snapshot.params.total;
    if(!localStorage.getItem('profile')) {
      this.router.navigate(['/dashboard']);
    } else {
      this.user = JSON.parse(localStorage.getItem('profile') || '');
      this.token = localStorage.getItem('token');
      this.headers= new HttpHeaders()
       .set('x-access-token', `${this.token}`);
    }
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [`${this.user.email}`, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [`${this.user?.ulica}`, Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: [`${this.user?.grad}`, Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: [`${this.user?.zipcode}`, Validators.required],
    });
  }

  select(event: Event) {
    this.selectedWay = (event.target as HTMLSelectElement).value;
  }

  onSubmit() {
    
    this.isLoading = true;
    localStorage.setItem('code', this.fourthFormGroup.value.fourthCtrl);
    this.forma = this._formBuilder.group({
      ulica: [`${this.secondFormGroup.value.secondCtrl}`],
      opstina: [`${this.thirdFormGroup.value.thirdCtrl}`],
      zipcode: [`${this.fourthFormGroup.value.fourthCtrl}`]
    });
    this.http.post('http://localhost:8085/user/delivery-info', this.forma.value, {headers: this.headers}).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.message = res.message;
        this.snack.open('Informacije uspesno sacuvane!', 'Close!', {
          duration: 5000
        });
        if(this.selectedWay === 'pouzecem') {
          this.isLoading = true;
          this.http.post(`http://localhost:8085/cart/create-order/${this.total}`, {naruceno: this.naruceno}, {headers: this.headers}).subscribe(
            (res: any) => {
              this.isLoading = false;
              this.router.navigate([`/payment-method/${this.selectedWay}/${this.total}`]);
            },
            (err: any) => {
              console.log(err)
            }
          )
        } else {
          this.router.navigate([`/payment-method/${this.selectedWay}/${this.total}`]);
        }
      },
      (err: any) => {
        console.log(err)
        this.isLoading = false;
      }
    )
  }

}
