import { UserRoles } from "./userRole";

export type AppUser = {
    id: number,
    name: string,
    lastName: string,
    email: string,
    password: string,
    role: UserRoles
}
