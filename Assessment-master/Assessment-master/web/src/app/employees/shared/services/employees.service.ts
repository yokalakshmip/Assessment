import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { APP_CONFIG } from './../../../../config';

export interface Employee{
  employeeid?: string;
  name: string;
  dob: Date;
  department: string;
  doj: Date;
  gender: string;
  created_at: Date;
  updated_at: Date;
   
}
@Injectable()
export class EmployeesService {
  constructor(
    private http: HttpClient,
  ) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${APP_CONFIG.api}/employees`);
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${APP_CONFIG.api}/employees/${id}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${APP_CONFIG.api}/employees`, employee);
  }

  updateEmployee(id: string, employee: Employee): Observable<any> {
    return this.http.put(`${APP_CONFIG.api}/employees/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>(`${APP_CONFIG.api}/employees/${id}`);
  }
}
