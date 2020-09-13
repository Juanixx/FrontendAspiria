import { ProductModel } from './../models/ProductModel';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  api = environment.apiAspiria;
  url = '';
  constructor(private http: HttpClient) {
    this.constructUrl();
  }

  getProducts() {
    return this.http.get(this.url).pipe(map((response) => response));
  }

  updateProduct(product: ProductModel) {
    return this.http.put(this.url + '/' + product.id, product).pipe(map((response) => response));
  }

  createProduct(product: ProductModel) {
    return this.http.post(this.url, product).pipe(map((response) => response));
  }

  deleteProduct(productId: number) {
    return this.http.delete(this.url + '/' + productId).pipe(map((response) => response));
  }

  constructUrl() {
    this.url = this.api + 'aspiria/products';
  }
}
