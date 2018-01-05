import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../shared/services/employees.service';

import { EmployeesService } from '../../shared/services/employees.service';
import { LoggerService } from './../../../shared/logger/logger.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-employees',
  styleUrls: ['employees.component.scss'],
  template: `
    <div class="employees">
      <app-employee-list
        [employees]="employeesTable">
      </app-employee-list>
    </div>
  `
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  employeesTable: MatTableDataSource<Employee>;
  isLoadingResults = true;

  displayedColumns = ['name', 'department', 'doj', 'edit'];

  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private loggerService: LoggerService
  ) {}

  ngOnInit() {

    this.employeesService.getEmployees()
    .subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
        this.employeesTable = new MatTableDataSource<Employee>(employees);
      },
      error => this.loggerService.error(error.error.message)
    );
  }
}
