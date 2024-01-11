import { Expose } from 'class-transformer';

export class RegisterDto{
    @Expose()
    name!: string;

    @Expose()
    username!: string;

    @Expose()
    password!: string;

    @Expose()
    role!: string;
}