import { ILogIn } from '../../log-in/log-in.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private http: HttpClient) { }
  logInURL = "http://localhost:3000/api/login"

  getAccess(logInInfo: ILogIn){
    console.info(`${LogInService.name}::${this.getAccess.name} -> ${JSON.stringify(logInInfo)}`)

    return this.http.post('http://localhost:3000/api/login', logInInfo).pipe(
      map(authResponse => {
        localStorage.setItem('token', authResponse['token']);
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
        return throwError(false)} else {
          if (error.status === 401) { 
            return throwError("Unauthorized User. Please contact an Admin")
          } else { 
            return throwError("Cannot connect to server")
          }
        }
      })
    )
  }

  isLoggedIn(){
    return !!localStorage.getItem('token')
  }

  
}
