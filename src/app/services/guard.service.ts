import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
//This Prevents Access of HomeScree If user is not logged In
export class AuthGuardService implements CanActivate {

  constructor(
    // private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
  ) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) : boolean{
    if(this.authService.getAuthStatus){
      return true;
    }else{
      // console.log('forcing Auth Navigation');
      this.router.navigate(['auth/signIn']);
      return false;
    }
  }
}



@Injectable({
  providedIn: 'root'
})
//This prevents access of Authentication Screen if user is already logged In
export class HomeGuardService implements CanActivate {

  constructor(
    // private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
  ) { }
  
  canActivate() : boolean {
    if(!this.authService.getAuthStatus){
      return true;
    }else{
      // console.log('forcing Home Navigation');
      this.router.navigate(['home']);
      return false;
    }
  }
}