import { LogInService } from './log-in.service';
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
        Authorization: `Bearer ${this.logInService.getToken()}`
      }
    })
    console.info("Interceptor", this.logInService.getToken())

    return next.handle(tokenizedReq)
  }


}
