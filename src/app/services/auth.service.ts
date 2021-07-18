import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

type authDetailsType = {
  isLoggedIn : boolean,
  fullName : string,
  // id: string,

}

enum sessEnum{
  authStatus = 'authStatus',
  fullName = 'fullName',
  // id = 'id',
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authDetails : authDetailsType
  constructor(private router:Router) {
    if(sessionStorage.getItem(sessEnum.authStatus) == 'true'){
      this.authDetails = {
        isLoggedIn : true,
        fullName : sessionStorage.getItem(sessEnum.fullName)!,
        // id : sessionStorage.getItem(sessEnum.id)!,
      }
    }else{
      this.authDetails = this.resetAuth();
    }
    
   }


   get getAuthStatus() : boolean {
     return this.authDetails.isLoggedIn;
   }

   getFullName() : string {
    return this.authDetails.fullName;
  }

  SignIn(newAuthDetails:authDetailsType) : void {
    this.authDetails = {...newAuthDetails};
    this.updateSessionStorage();
    this.router.navigate(['home']);
  }


   //sign out or reset auth status
   signOut() : void {
     this.authDetails = this.resetAuth();
     this.updateSessionStorage();
     this.router.navigate(['auth/signIn']);
   }

   private updateSessionStorage(){
    sessionStorage.setItem(sessEnum.authStatus,this.authDetails.isLoggedIn.toString());
    sessionStorage.setItem(sessEnum.fullName,this.authDetails.fullName);
    // sessionStorage.setItem(sessEnum.id,this.authDetails.id);
   }

   private resetAuth() : authDetailsType{
     return {
      isLoggedIn : false,
      fullName : '',
      // id : ''
    }
   }
}
