import { UserRole } from "./UserRole";

export interface User {
  id: string; // Faremos a geração de ID em breve.
  name: string;
  email: string;
  role: UserRole;
  //createdAt: Date; 
  //updatedAt: Date; 
}

export { UserRole };