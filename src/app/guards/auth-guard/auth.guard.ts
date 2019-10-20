import { LogInService } from '../../services/log-in-service/log-in.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
// export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private logInService: LogInService){}

  canActivate(){
    if (this.logInService.isLoggedIn()){
      console.info('Token is present')
      return true
    } else {
      console.info('Token is not present')
      this.router.navigate([''])
      return false
    }

  }

}
