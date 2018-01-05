import { Controller, Get, Post, Delete, Body, UseGuards, Param, Request, HttpException, HttpStatus, Put } from '@nestjs/common';


import { RolesGuard } from '../common/guards/roles.guard';
import { EmployeesService } from './employees.service';
import { Employee } from './interfaces/employee.interface';

@Controller('employees')
@UseGuards(RolesGuard)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async index(): Promise<Employee[]> {
    return await this.employeesService.findAll();
  }
  
  @Get(':id')
  async show(@Request() req): Promise<Employee> {
    const id = req.params.id;
    if (!id) throw new HttpException('ID parameter is missing', HttpStatus.BAD_REQUEST);

    const user = await this.employeesService.findById(id);
    if (!user) throw new HttpException(`The user with the id: ${id} does not exists`, HttpStatus.BAD_REQUEST);

    return user
  }

  @Post()
  async create(@Body() body) {
    if (!body || (body && Object.keys(body).length === 0)) throw new HttpException('Missing informations', HttpStatus.BAD_REQUEST);

    await this.employeesService.create(body);
  }

  @Put(':id')
  async update(@Request() req) {
    const id = req.params.id;
    if (!id) throw new HttpException('ID parameter is missing', HttpStatus.BAD_REQUEST);

    await this.employeesService.update(id, req.body);
  }

  @Delete(':id')
  public async delete(@Request() req) {
      const id = req.params.id;
      if (!id) throw new HttpException('ID parameter is missing', HttpStatus.BAD_REQUEST);

      await this.employeesService.delete(id);
  }
}
