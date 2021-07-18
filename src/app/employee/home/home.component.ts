import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { crudResponse } from 'src/app/models/authModels';
import { employee } from 'src/app/models/employeeModels';
import uri from 'src/app/services/uri.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageNumber = 1
  limit = 10
  base = 0
  employeeList : employee[] = [];
  constructor(private route:ActivatedRoute, private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      console.log(params);
      try{
        let page =  Number(params['pageNumber'] ?? '1');
        if(page < 1 || isNaN(page)){
          this.goToPage(1)
          return;
        }else{
          this.pageNumber = page;
        }
      }catch(e){
        console.error(e);
        this.goToPage(1);
        return;
      }
      this.base = ((this.pageNumber-1)*this.limit);
      this.fetchEmployeeList();
    })
    
  }

  fetchEmployeeList(){
    this.http.get<employee[]>(uri.getEmployees+'/'+this.pageNumber).subscribe(res =>{
      this.employeeList = res;
    },err=>{
      console.error(err);
      alert('Failed to load employee data');
    })
  }

  goToPage(pageNumber:Number | String){
    this.router.navigate(['home/'+pageNumber.toString()])
  }

  goToPrevPage(){
    this.goToPage(this.pageNumber -1);
  }
  goToNextPage(){
    this.goToPage(this.pageNumber +1);
  }

  //code for delete employee
  deleteEmployee(emp:employee){
    const can = confirm(`Delete employee ${emp.empId} ?`)
    if(!can){
      return;
    }
    this.http.post<crudResponse>(uri.deleteEmployee,{empId:emp.empId}).subscribe(
      res =>{
        if(res.response == true && res.details == 'DELETED'){
          alert('Employee Deleted Successfully');
          this.fetchEmployeeList();
        }else{
          alert('Failed to delete employee');
        }
      },
      err =>{
        console.error(err);
        alert('Error occurred while deleting employee record');
      }
    )
  }

  

  //Code for setting employee edit
  employeeForEdit: employee | undefined
  editEmployee(emp:employee){
    this.employeeForEdit = Object.assign(emp);
    this.toggleModal();
  }


  //code for setting new employee addition
  addNewEmployee(){
    this.employeeForEdit = undefined
    this.toggleModal();
  }

  // Code for modal
  showModal = false;
  toggleModal(){
    this.showModal = !this.showModal;
  }

}
