import { Document } from 'mongoose';

export interface User extends Document{
  readonly userid?: string;
  readonly name: string;
  readonly age?: number;
  readonly email: string;
  readonly password: string;
  readonly username?: string;
  readonly admin?: boolean;
  readonly created_at: Date;
  readonly updated_at: Date;
}
