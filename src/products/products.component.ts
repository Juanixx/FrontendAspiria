import { ProductModel } from './shared/models/ProductModel';
import { ProductsService } from './shared/services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  results: Array<ProductModel>;
  displayedColumns: string[] = ['nombre', 'descripcion', 'restriccionEdad', 'compania', 'precio'];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.cargarDatos();
  }
  
  cargarDatos(){
    this.productsService.getProducts().subscribe(result => {
      this.results = result as Array<ProductModel>;
      console.log('results => ' + result);
    });
  }
}
