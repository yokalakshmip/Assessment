import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { Employee } from './interfaces/employee.interface';

@Component()
export class EmployeesService {
  constructor(
    @Inject('EmployeeModelToken') private readonly EmployeeModel: Model<Employee>
  ) { }

  async create(employee: Employee): Promise<Employee> {
    const createdEmployee = new this.EmployeeModel(employee);
    return await createdEmployee.save();
  }

  async findAll(options?: any): Promise<Employee[]> {
    let employees = await this.EmployeeModel.find(options).exec();
    const serializedEmployees = employees.map((employee) => {
      return employee.schema.methods.serialize(employee);
    });
    return serializedEmployees;
  }

  async findById(id: string): Promise<Employee | null> {
    let employee = await this.EmployeeModel.findById(id).exec();
    if (employee) {
      employee = await this.serializeEmployee(employee);
    }
    return employee;
  }

  async findOne(options?: any, fields?: any): Promise<Employee | null> {
    let employee = await this.EmployeeModel.findOne(options, fields).exec();

    if (employee) {
      employee = await this.serializeEmployee(employee);
    }

    return employee;
  }

  async update(id: number, newValue: Employee): Promise<Employee | null> {
    console.log(id);
    return await this.EmployeeModel.findByIdAndUpdate(id, newValue).exec();
  }

  async delete(id: number): Promise<Employee | null> {
    return await this.EmployeeModel.findByIdAndRemove(id).exec();
  }
  async serializeEmployee(employee: any): Promise<any> {
    return {
      employeeid: employee._id,
      title: employee.title,
      year: employee.year,
      cast: employee.cast,
      rating: employee.rating,
      genre: employee.genre,
      story: employee.story,
      created_at: employee.created_at,
      updated_at: employee.updated_at
    }
  }
}