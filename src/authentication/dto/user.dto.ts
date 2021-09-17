import { Exclude } from 'class-transformer';

export class UserDto {
    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
      }

    
    id?: string;

    username: string;

    @Exclude()
    password: string;

}