import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  modules: [
    AuthModule,
    UsersModule,
      EmployeesModule
  ]
})
export class ApplicationModule {}
