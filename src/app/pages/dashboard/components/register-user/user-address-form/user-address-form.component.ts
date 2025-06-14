import { Component,OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterUserService } from '../../../services/register-user.service';
import { ProvinceService } from '../../../services/province.service';
import { DepartmentsAddressService } from '../../../services/departments-address.service'
@Component({
  selector: 'app-user-address-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-address-form.component.html',
  styleUrl: './user-address-form.component.scss'
})
export class UserAddressFormComponent {
  departments:{id:number,name:string}[]=[];
  provinces:{id:number,name:string}[]=[];
  constructor(public registerUserService: RegisterUserService,
    private provinceService: ProvinceService,
    private departmentsAddressService: DepartmentsAddressService
  ) {}
  ngOnInit(): void {
    this.getDepartments();
  }
  ngOnChanges(): void {
    this.getDepartments();
  }
  getDepartments(){
    this.departmentsAddressService.getDepartments().subscribe(departments => {
      this.departments = departments;
      console.log(this.departments);
    });
    return this.departments;
  }
  getProvinces(departmentName:string){
    this.provinceService.getProvincesByDepartment(departmentName).subscribe(provinces => {
      this.provinces = provinces;
    });
    return this.provinces;
  }
  onChangeDepartment(event: any) {
    const departmentName = event.target.value;
    this.getProvinces(departmentName);
  }
  onChangeProvince(event: any) {
    const provinceName = event.target.value;
    this.getForm().get('province')?.setValue(provinceName);
    console.log(this.getForm());
  }
  getForm(){
    return this.registerUserService.addressForm;
  }
  getFieldError(formName:string,fieldName:string): string | null {
    return this.registerUserService.getFieldError(formName, fieldName);
  }
  nextStep() {
    this.registerUserService.nextStep();
  }
  previousStep() {
    this.registerUserService.previousStep();
  }
}
