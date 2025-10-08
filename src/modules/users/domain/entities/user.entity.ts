import { UserStore } from './user-store.entity';

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public lastName: string,
    public email: string,
    public password: string, //hashed password
    public userStores: UserStore[],
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  changePassword(newHashedPassword: string) {
    this.password = newHashedPassword;
  }
}
