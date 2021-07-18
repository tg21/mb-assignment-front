import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { AuthComponent } from './authentication/auth/auth.component';

import { TrimDirectiveModule } from './directives/trim-directive.module';

@NgModule({
  declarations: [
    AppComponent,
     SignInComponent,
     SignUpComponent,
     AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TrimDirectiveModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
