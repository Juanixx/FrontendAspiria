import { ModalContents } from './../shared/constants/modal-contents';
import { ConfirmDialogComponent } from './../shared/components/confirm-dialog/confirm-dialog.component';
import { CrudMode } from '../shared/enums/crud.mode';
import { ProductComponent } from './product/product.component';
import { ProductModel } from './shared/models/ProductModel';
import { ProductsService } from './shared/services/products.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  results: Array<ProductModel>;
  displayedColumns: string[] = ['position', 'nombre', 'descripcion', 'restriccionEdad', 'compania', 'precio', 'deleteProduct', 'editProduct'];

  constructor(private productsService: ProductsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productsService.getProducts().subscribe(result => {
      this.results = result as Array<ProductModel>;
    });
  }

  eliminarProducto(producto: ProductModel){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {tittle: ModalContents.DeleteProduct.tittle, message: ModalContents.DeleteProduct.message}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.productsService.deleteProduct(producto.id).subscribe(() => {
          this.cargarProductos();
        });
      }
    });
  }

  editarproducto(producto: ProductModel){
    this.openProductDialog(producto);
  }

  openProductDialog(producto: ProductModel = null) {
    const dialogRef = this.dialog.open(ProductComponent, {
      width: '500px'
    });

    if(producto){
      dialogRef.componentInstance.product = producto;
    }

    dialogRef.componentInstance.crudMode = producto != null ? CrudMode.edit : CrudMode.create;
    dialogRef.componentInstance.createProductAction.subscribe(result => {
      this.productsService.createProduct(result).subscribe(() => {
        this.cargarProductos();
        dialogRef.close();
      });
    });

    dialogRef.componentInstance.updateProductAction.subscribe(result => {
      this.productsService.updateProduct(result).subscribe(() => {
        this.cargarProductos();
        dialogRef.close();
      });
    });
  }

  
}
