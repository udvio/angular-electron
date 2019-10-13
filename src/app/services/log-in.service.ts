import { ILogIn } from './../log-in/log-in.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private http: HttpClient) { }
  logInURL = "http://localhost:3000/api/login"

  getAccess(logInInfo: ILogIn){
    console.info("getAccess logs", logInInfo)
    return this.http.post('http://localhost:3000/api/login', logInInfo)
  }

  isLoggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken() {
    console.info(localStorage.getItem('token'))
    return localStorage.getItem('token')
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  
}
