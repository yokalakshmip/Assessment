import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from './../material.module';

// Services
import { EmployeesService } from './shared/services/employees.service';

// components
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

// containers
import { EmployeesComponent } from './containers/employees/employees.component';
import { EmployeeComponent } from './containers/employee/employee.component';

export const ROUTES: Routes = [
  { path: '', component: EmployeesComponent},
  { path: 'new', component: EmployeeComponent },
  { path: ':id', component: EmployeeComponent},
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    MaterialModule
  ],
  declarations: [
    EmployeesComponent,
    EmployeeComponent,
    EmployeeFormComponent,
    EmployeeListComponent
  ],
  providers: [
    EmployeesService,
  ]
})
export class EmployeesModule {}
