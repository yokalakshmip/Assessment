import { Connection } from 'mongoose';
import { EmployeeSchema } from './schemas/employee.schema';

export const employeesProviders = [
  {
    provide: 'EmployeeModelToken', // Deplace to a constants.ts
    useFactory: (connection: Connection) => connection.model('Employee', EmployeeSchema),
    inject: ['DbConnectionToken'], // Deplace to a constants.ts
  },
];