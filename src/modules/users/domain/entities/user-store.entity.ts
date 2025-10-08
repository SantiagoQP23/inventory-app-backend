export type Role = 'OWNER' | 'STAFF';

export class UserStore {
  constructor(
    public readonly id: string,
    public readonly storeId: string,
    public readonly userId: string,
    public role: Role,
  ) {}
}
