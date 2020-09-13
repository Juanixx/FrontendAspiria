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
      console.log('results => ' + result);
    });
  }

  eliminarProducto(producto: ProductModel){
    this.productsService.deleteProduct(producto.id).subscribe(() => {
      this.cargarProductos();
    });
  }

  editarproducto(producto: ProductModel){
    this.openProductDiaolog(producto);
  }

  openProductDiaolog(producto: ProductModel = null) {
    const dialogRef = this.dialog.open(ProductComponent, {
      width: '600px',
    });

    if(producto){
      dialogRef.componentInstance.product = producto;
    }

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
