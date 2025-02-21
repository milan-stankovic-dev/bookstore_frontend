import { UserRoles } from "./userRole"

export type RegisterRequest = {
    name: string,
    lastName: string,
    email: string,
    password: string,
    role: UserRoles
}
