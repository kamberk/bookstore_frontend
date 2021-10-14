import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  isLoading = false;
  FormData!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private http: HttpClient,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      Fullname: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      Comment: new FormControl('', [Validators.required])
      })
  }

  onSubmit(FormData: any) {
    this.isLoading = true;
    console.log(FormData);
    this.http.post('http://143.198.178.167:8080/user/contact', FormData).subscribe(
      (res: any) => {
        console.log(res);
        this.snack.open('Poslali ste poruku!', 'Zatvori!', {
          duration: 5000
        });
        this.isLoading = false;
      },
      (err: any) => {
        console.log(err)
        this.isLoading = false;
      }
    );
  }

}
