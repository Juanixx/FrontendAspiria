import { ProductComponent } from './../products/product/product.component';
import { HttpAspiriaInterceptor } from '../shared/services/http.aspiria.interceptor';
import { ProductsComponent } from './../products/products.component';
import { ProductsService } from './../products/shared/services/products.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    ProductsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAspiriaInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
