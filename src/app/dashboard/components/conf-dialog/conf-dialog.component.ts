import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-conf-dialog',
  templateUrl: './conf-dialog.component.html',
  styleUrls: ['./conf-dialog.component.scss']
})
export class ConfDialogComponent implements OnInit {

  message: string = "Jeste li sigurni?"
  confirmButtonText = "Izbrisi!"
  cancelButtonText = "Ponisti!"

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfDialogComponent>
  ) {
    if(data){
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
        }
   }

   onConfirmClick(): void {
    this.dialogRef.close(true);
    console.log("Deleting..")
  }

  ngOnInit(): void {
  }

}
