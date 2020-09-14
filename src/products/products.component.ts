import { Images } from './../shared/constants/images';
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
  images: Array<string>;
  displayedColumns: string[] = ['position', 'nombre', 'imageUrl', 'descripcion', 'restriccionEdad', 'compania', 'precio', 'deleteProduct', 'editProduct'];

  constructor(private productsService: ProductsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.cargarProductos();
    this.createImgsArray();
  }

  cargarProductos() {
    this.productsService.getProducts().subscribe(result => {
      this.results = result as Array<ProductModel>;
      this.results.map(producto =>{
        producto.imageUrl = this.randomImage;
        return producto;
      })
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

  get randomImage(){
    return this.images[Math.floor(Math.random() * this.images.length)]
  }

  createImgsArray(){
    this.images = [ Images.img1, Images.img2, Images.img3, Images.img4, Images.img4, Images.img5];
  }
}
