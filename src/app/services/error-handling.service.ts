import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() { }

  handleError(error: HttpErrorResponse) {
    
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = 'Something bad happened in angular; please try again later.';
    } else {
      // server-side error
      if(error.status != 400)
        errorMessage = 'Something bad happened in spring boot; please try again later.';
      else
        errorMessage= error.message;
    }
    window.alert(errorMessage);
    throwError(errorMessage)
    return errorMessage;
  }
}
