import { Module, RequestMethod, MiddlewaresConsumer } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { AuthMiddleware } from '../common/middlewares/auth.middlewares';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { employeesProviders } from './employees.providers';

@Module({
  modules: [DatabaseModule],
  controllers: [EmployeesController],
  components: [
      EmployeesService,
      ...employeesProviders,
  ],
  exports: [
      EmployeesService
  ],
})
export class    EmployeesModule {
  public configure(consumer: MiddlewaresConsumer) {
   // consumer.apply(AuthMiddleware).forRoutes(
       // { path: '/users', method: RequestMethod.GET },
       // { path: '/users/:id', method: RequestMethod.GET },
        // { path: '/users/:id', method: RequestMethod.PUT },
        // { path: '/users/:id', method: RequestMethod.DELETE },
   // );
}
}