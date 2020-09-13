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

  eliminarProducto(){

  }

  editarproducto(){
    
  }

  openProductDiaolog() {
    const dialogRef = this.dialog.open(ProductComponent, {
      width: '600px',
    });

    dialogRef.componentInstance.productAction.subscribe(result => {
      this.productsService.createProduct(result).subscribe(result => {
        this.cargarProductos();
        dialogRef.close();
      });
    });
  }
}
