import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { crudResponse } from 'src/app/models/authModels';
import { employee } from 'src/app/models/employeeModels';
import uri from 'src/app/services/uri.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  employeeForm: FormGroup

  editMode : boolean = false
  _empIdCopy: String = ''
 
  private _employeeForEdit: employee | undefined;
  @Input()
  public get employeeForEdit(): employee | undefined {
    return this._employeeForEdit;
  }
  public set employeeForEdit(value: employee | undefined) {
    this._employeeForEdit = value;
    
    // enabling edit mode on form if employee values are present
    if(this._employeeForEdit){ //editMode
      this.editMode = true;
      this._empIdCopy = this.employeeForEdit!.empId
    }else{
      this.editMode = false;
    }
    this.editMode = value ? true : false;
    
    this.employeeForm = this.initializeForm();
  }

  @Output() submissionSuccess = new EventEmitter<void>();

  constructor(private formBuilder:FormBuilder, private http:HttpClient) {
    this.employeeForm = this.initializeForm();
   }

  ngOnInit(): void {
  }

  //initialize
  initializeForm(){
    return this.formBuilder.group({
      empId : [this._employeeForEdit ? this._employeeForEdit.empId :'',[Validators.required,Validators.minLength(1)]],
      firstName: [this._employeeForEdit ? this._employeeForEdit.firstName :'',[Validators.required,Validators.minLength(4)]],
      lastName: [this._employeeForEdit ? this._employeeForEdit.lastName :'',[Validators.required,Validators.minLength(4)]],
      address: [this._employeeForEdit ? this._employeeForEdit.address :'',[Validators.required]],
      dob : [this._employeeForEdit ? this._employeeForEdit.dob :null,[Validators.required]],
      mobile: [this._employeeForEdit ? this._employeeForEdit.mobile :'',[Validators.required,Validators.minLength(10),Validators.maxLength(14)]],
      city: [this._employeeForEdit ? this._employeeForEdit.city :'',[Validators.required]]
    })
  }
  get getControl(){
    return this.employeeForm.controls
  }

  resetForm(){
    this.employeeForm = this.initializeForm();
  }

  submitForm(){
    console.log(this.employeeForm);
    if(this.editMode){
      this.updateExistingEmployee();
    }else{
      this.addNewEmployee();
    }
  }

  // add new employee
  addNewEmployee(){
    this.http.post<crudResponse>(uri.addEmployees,this.employeeForm.value).subscribe(res=>{
      if(res.response == true && res.details == "ADDED"){
        alert('Successfully added new employee');
        this.submissionSuccess.emit();
        this.resetForm();
        //TODO:reload employee list
      }
      else if(res.details == "DUPLICATE"){
        alert('An employee with same Emp ID already exists');
      }else{
        alert('Failed to add new employee');
      }
    },err => {
      console.error(err);
      alert('Error Occurred while adding employee');
    })
  }


  //updating employee
  updateExistingEmployee(){
    this.http.post<crudResponse>(uri.editEmployee,{
      empId : this._empIdCopy,
      employee: this.employeeForm.value
    }).subscribe(res =>{
      if(res.response == true && res.details == 'UPDATED'){
        alert('Successfully updated existing employee');
        this.employeeForEdit = undefined;
        this._empIdCopy = '';
        this.editMode = false;
        this.submissionSuccess.emit();
        this.resetForm();
      }else if(res.details == 'NOT_FOUND'){
        alert('Employee Not Found for updating');
      }else{
        alert('Failed to update existing employee');
      }
    },err =>{
      console.error(err);
      alert('Error Occurred while adding employee');
    })
  }
}
