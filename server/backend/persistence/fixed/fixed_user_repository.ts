import { User } from "../../domain/auth/user";
import { InmemUserRepository } from "../inmem/inmem_user_repository";
import _userData from "./fixed_user_data.json";

export class FixedUserRepository extends InmemUserRepository {
    constructor() {
        super(_userData.map((u) => new User(u.username, u.password, u.name, u.phoneNumber)))
    }
}
