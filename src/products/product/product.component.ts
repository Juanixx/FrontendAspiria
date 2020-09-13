import { CrudMode } from '../../shared/enums/crud.mode'
import { ProductModel } from './../shared/models/ProductModel';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  product: ProductModel;
  crudMode: CrudMode;
  @Output() createProductAction = new EventEmitter<any>();
  @Output() updateProductAction = new EventEmitter<any>();
  constructor(public dialogRef: MatDialogRef<ProductComponent>, private fb: FormBuilder) {
    this.initProductForm();
  }

  ngOnInit() {
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  initProductForm() {
    this.productForm = this.fb.group({
      id:['0'],
      nombre: ['', Validators.required],
      descripcion: [''],
      restriccionEdad: ['', [Validators.min(0), Validators.max(100)]],
      compania: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(1), Validators.max(1000)]]
    });
  }

  submitProduct() {
    if (this.productForm.valid) {
      if (this.crudMode === CrudMode.create) {
        this.createProductAction.emit(this.productForm.value);
      }
      if (this.crudMode === CrudMode.edit) {
        this.updateProductAction.emit(this.productForm.value);
      }
    }
  }

}
