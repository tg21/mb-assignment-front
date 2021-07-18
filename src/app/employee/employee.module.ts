import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppDropdownDirective } from "../directives/app-dropdown.directive";
import { TrimDirectiveModule } from "../directives/trim-directive.module";

import { EmployeeFormComponent } from "./employee-form/employee-form.component";
import { EmployeeRoutingModule } from "./employee-routing.module";
import { HomeComponent } from "./home/home.component";
import { NavMeuComponent } from "./nav-menu/nav-menu.component";

@NgModule({
    imports :[
        CommonModule,
        EmployeeRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        TrimDirectiveModule,
    ],
    declarations:[
        HomeComponent,
        EmployeeFormComponent,
        NavMeuComponent,
        AppDropdownDirective
    ],
    exports: [
        HomeComponent,
        EmployeeFormComponent,
        NavMeuComponent,
        AppDropdownDirective,
    ]
})
export class EmployeeModule{}