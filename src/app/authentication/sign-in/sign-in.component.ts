import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { signInResponseModel } from '../../models/authModels';
import { AuthService } from '../../services/auth.service';

import uri from '../../services/uri.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private http: HttpClient, private authService : AuthService, private formBuilder:FormBuilder) { 
    // console.log('authStatus', this.authService.getAuthStatus());
    this.signInForm = this.resetForm();
  }

  ngOnInit(): void {
  }


  //sign In
  submitForm(){
    console.log(this.signInForm);
    // console.log('Signing In');
    // this.authService.SignIn({
    //   // id : '123',
    //   fullName: 'Tushar Gautam',
    //   isLoggedIn : true,
    // })

    this.http.post<signInResponseModel>(uri.signIn,this.signInForm.value).subscribe(res => {
      if(res.authenticated == true){
        this.authService.SignIn({
          fullName : res.firstName + ' ' + res.lastName,
          isLoggedIn: res.authenticated,
        })
      }
      else{
        alert('Incorrect email id or password');
      }
    },
    err =>{
      console.error(err);
      alert('Failed to Sign In');
    }
    )
    
  }

  get getControl(){
    return this.signInForm.controls;
  }

  //reset or initialize form group
  resetForm(){
    return this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

}
