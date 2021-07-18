import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './authentication/auth/auth.component';
// import { HomeComponent } from './employee/home/home.component';
import { AuthGuardService, HomeGuardService } from './services/guard.service';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';

const routes: Routes = [
  //Nested Auth Routes
  {
    path:'auth',
    component:AuthComponent,
    canActivate:[HomeGuardService],
    children:[
    {path:'signIn',component:SignInComponent},
    {path:'signUp',component:SignUpComponent},
    // {path:'',redirectTo:'signIn',pathMatch:'full'},
    {path:'**',redirectTo:'signIn'},
    ]
  },
  // {path:'signIn',component:SignInComponent,canActivate:[HomeGuardService]},
  // {path:'signUp',component:SignUpComponent,canActivate:[HomeGuardService]},

  // {path:'home/:pageNumber',component:HomeComponent, canActivate:[AuthGuardService]},
  // {path:'home',component:HomeComponent, canActivate:[AuthGuardService]},

  {
    path:'home/:pageNumber',
    loadChildren: () => import('./employee/employee.module').then(module => module.EmployeeModule),
    canActivate:[AuthGuardService]
  },
  {
    path:'home',
    loadChildren: () => import('./employee/employee.module').then(module => module.EmployeeModule),
    canActivate:[AuthGuardService]
  },
  {path:'**',redirectTo:'/auth/signIn'}

];

@NgModule({
  imports: 
  [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
