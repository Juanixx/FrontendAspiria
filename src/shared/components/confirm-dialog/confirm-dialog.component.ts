import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalContents } from './../../interfaces/modal-contents';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalContents) { }

  ngOnInit() {
  }

}
