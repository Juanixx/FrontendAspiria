import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  @Output() productAction = new EventEmitter<any>();
  constructor(public dialogRef: MatDialogRef<ProductComponent>, private fb: FormBuilder) {
    this.initProductForm();
  }

  ngOnInit() {
  }

  initProductForm(){
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      restriccionEdad: [''],
      compania: ['', Validators.required],
      precio: ['', Validators.required]
    });
  }

  submitProduct(){
    if(this.productForm.valid){
      this.productAction.emit(this.productForm.value);
    }
  }

}
