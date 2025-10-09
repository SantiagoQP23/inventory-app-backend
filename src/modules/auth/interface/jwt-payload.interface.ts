export interface JwtPayload {
  userId: string;
  email: string;
  roles: { storeId: string; role: string }[];
}
