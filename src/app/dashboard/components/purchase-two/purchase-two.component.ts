import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-two',
  templateUrl: './purchase-two.component.html',
  styleUrls: ['./purchase-two.component.scss']
})
export class PurchaseTwoComponent implements OnInit {

  nacinPlacanja: any;
  kartica: Boolean = false;
  total: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.nacinPlacanja = this.activatedRoute.snapshot.params.way;
    this.total = this.activatedRoute.snapshot.params.total;
    console.log(this.nacinPlacanja);
    if(this.nacinPlacanja === 'kartica') {
      this.kartica = true;
    } else {
      this.kartica = false;
    }
  }

}
