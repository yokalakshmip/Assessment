import { Component, Input, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import { Employee } from '../../shared/services/employees.service';
import { AfterViewInit, OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-employee-list',
  styleUrls: ['employee-list.component.scss'],
  template: `
    <div class="employee-list">
      <div class="table-header">
        <h1>Employees list</h1>

        <mat-form-field>
          <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Filter">
        </mat-form-field>

        <a mat-raised-button color="primary" class="create-employee" [routerLink]="'../employees/new'">
          <mat-icon>add</mat-icon> New
        </a>
      </div>

      <div class="container mat-elevation-z8">
        <mat-table [dataSource]="employees" matSort>

          <!-- Name column -->
          <ng-container matColumnDef="title">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Title </mat-header-cell>
            <mat-cell *matCellDef="let employee"> {{ employee.name }} </mat-cell>
          </ng-container>

          <!-- Department column -->
          <ng-container matColumnDef="year">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Department </mat-header-cell>
            <mat-cell *matCellDef="let employee"> {{ employee.department }} </mat-cell>
          </ng-container>

          <!-- DateOfJoin column -->
          <ng-container matColumnDef="createdAt">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Date Of Join </mat-header-cell>
            <mat-cell *matCellDef="let employee"> {{ employee.doj | date : 'MMM d, yyyy' }} </mat-cell>
          </ng-container>

          <!-- Edit column -->
          <ng-container matColumnDef="edit">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Edit </mat-header-cell>
            <mat-cell *matCellDef="let employee">
              <a [routerLink]="['../employees', employee.employeeid]"><mat-icon>create</mat-icon></a></mat-cell>
          </ng-container>

          <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
          <mat-row *matRowDef="let employee; columns: displayedColumns;">
          </mat-row>
        </mat-table>

      </div>
    </div>
  `
})

export class EmployeeListComponent  {

  displayedColumns = ['title', 'year', 'createdAt', 'edit'];
  dataSource: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input()
  employees: Employee[];

  constructor() {}

  

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
