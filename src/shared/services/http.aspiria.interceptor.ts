import { ErrorModel } from './../models/error.model';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpAspiriaInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.keys().length === 0) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        },
      });
    }

    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      this.handleError(error);
      return of(error);
    }) as any);
  }

  handleError(error: HttpErrorResponse) {
    if (error.error && error.error.message) {
      const errorModel = error.error as ErrorModel;
      this.openModal(errorModel);

    } else {
      let errorModel = new ErrorModel();
      errorModel.message = error.message;
      errorModel.statusCode = error.status.toString();
      this.openModal(errorModel);
    }
  }

  openModal(error: ErrorModel) {
    // const modalRef = this.modalService.open(ErrorModalComponent, { size: 'lg', backdrop: 'static' });
    // modalRef.componentInstance.error = error;
  }
}