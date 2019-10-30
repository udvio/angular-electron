import { LogInService } from '../log-in-service/log-in.service';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{


  constructor(private injector: Injector, private logInService: LogInService) { }

  intercept(req, next) {
    // let logInService = this.injector.get(LogInService)

    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    return next.handle(tokenizedReq)
  }


}
