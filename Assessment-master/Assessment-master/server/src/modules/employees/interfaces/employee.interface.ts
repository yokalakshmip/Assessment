import { Document } from 'mongoose';

export interface Employee extends Document{
  readonly employeeid?: string;
  readonly name: string;
  readonly dob: Date;
  readonly department: string;
  readonly doj: Date;
  readonly gender: string;
  readonly created_at: Date;
  readonly updated_at: Date;
}
