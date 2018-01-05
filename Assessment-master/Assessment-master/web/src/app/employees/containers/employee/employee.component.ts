import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Employee, EmployeesService } from '../../shared/services/employees.service';
import { LoggerService } from '../../../shared/logger/logger.service';

@Component({
  selector: 'app-employee',
  styleUrls: ['employee.component.scss'],
  template: `
    <div>
      <app-employee-form
        [employee]="employee"
        (create)="addEmployee($event)"
        (update)="updateEmployee($event)"
        (remove)="removeEmployee()">
      </app-employee-form>
    </div>
  `
})
export class EmployeeComponent implements OnInit {

  employee: Employee;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private loggerService: LoggerService
  ) {}

  ngOnInit() {

    // Retrieve the prefetched employees
    this.route.data.subscribe(
      (data: { employee: Employee }) => {
        this.employee = data.employee;
      }
    );
  }

  addEmployee(event: Employee) {
    this.employeesService.createEmployee(event)
      .subscribe(
        res => {
          this.loggerService.success('Employee successfully added');
          this.backToEmployees();
        },
        error => this.loggerService.error(error.error.message)
      );
  }

  updateEmployee(event: Employee) {
    const key = this.route.snapshot.params.id;

    this.employeesService.updateEmployee(key, event)
      .subscribe(
        res => {
          this.loggerService.success('Employee successfully updated');
          this.backToEmployees();
        },
        error => this.loggerService.error(error.error.message)
      );
  }

  removeEmployee() {
    const key = this.route.snapshot.params.id;

    this.employeesService.deleteEmployee(key)
      .subscribe(
        res => {
          this.loggerService.success('Employee successfully deleted');
          this.backToEmployees();
        },
        error => this.loggerService.error(error.error.message)
      );
  }

  backToEmployees() {
    this.router.navigate(['employees']);
  }
}
