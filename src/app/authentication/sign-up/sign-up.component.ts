import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { crudResponse } from '../../models/authModels';
import { AuthService } from '../../services/auth.service';
import uri from '../../services/uri.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm : FormGroup
  confirmPassword: string = ''
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private authService: AuthService) {
    this.signUpForm = this.initializeForm();
  }

  ngOnInit(): void {
  }

  /**TODO:
   * validate dob,
  */

  initializeForm(){
    this.confirmPassword = '';
    return this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['',[Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')]],
      // confirmedPassword: ['',[Validators.required]],
      address: ['',[Validators.required]],
      dob: [null,[Validators.required]],
      company: ['', [Validators.required]],
    }
    )
  }

    

  get getControl(){
    return this.signUpForm.controls
  }

  submitForm(){
    console.log(this.signUpForm)
    // make http Request
    this.http.post<crudResponse>(uri.signUp,this.signUpForm.value).subscribe(res=>{
      if(res.response == true && res.details == 'ADDED'){
        alert('Sign Up successful');

        // emulating signIn with already available data
        this.authService.SignIn({
          fullName : this.signUpForm.value.firstName + ' ' + this.signUpForm.value.lastName,
          isLoggedIn: true,
        })
      }else if(res.details == 'DUPLICATE'){
        alert('Account with same email id already exists');
      }
      else{
        alert('We Had trouble signing you up');
      }
    },
    err=>{
      console.error(err);
      alert('Error Signing Up')
    })
    
  }

}
