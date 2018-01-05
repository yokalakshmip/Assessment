import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Employee } from '../../shared/services/employees.service';

@Component({
  selector: 'app-employee-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['employee-form.component.scss'],
  template: `
    <div class="employee-form">
      <form [formGroup]="form">
<mat-form-field>
        <input
          matInput
          placeholder="Name*"
          formControlName="name">
        <mat-error *ngIf="required('name')">
          Name is <strong>required</strong>
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <input
          matInput
          placeholder="Department*"
          formControlName="department">
        <mat-error *ngIf="required('department')">
          Department is <strong>required</strong>
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <input
          matInput
          placeholder="DateOfJoin*"
          formControlName="doj">
        <mat-error *ngIf="required('doj')">
          DateOfJoin is <strong>required</strong>
        </mat-error>
      </mat-form-field>

      

      <div class="submit">
        <button mat-raised-button color="primary" *ngIf="!exists" (click)="createEmployee()">Create employee</button>
        <button mat-raised-button color="primary" *ngIf="exists" (click)="updateEmployee()">Update employee</button>
        <a mat-raised-button color="warn" [routerLink]="['../']">Cancel</a>
        <button mat-raised-button color="primary" *ngIf="exists" (click)="removeEmployee()">Delete employee</button>
      </div>

      </form>
    </div>
  `
})
export class EmployeeFormComponent implements OnChanges {

  exists = false;

  @Input()
  employee: Employee;

  @Output()
  create = new EventEmitter<Employee>();

  @Output()
  update = new EventEmitter<Employee>();

  @Output()
  remove = new EventEmitter<Employee>();

  form = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    author: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.employee) {
      this.exists = true;

      const value = this.employee;
      this.form.patchValue(value);
    }
  }

  required(field) {
    return (
      this.form.get(field).hasError('required') &&
      this.form.get(field).touched
    );
  }

  createEmployee() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateEmployee() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeEmployee() {
    this.remove.emit();
  }
}
