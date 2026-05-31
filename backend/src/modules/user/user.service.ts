import { NotFoundError } from "@common/errors/index.errors.js";
import { UserRepository } from "./user.repository.js";

export class UserService {
    constructor(private userRepository: UserRepository) {}
    
    me = async (userId: string) => {
        const user = await this.userRepository.findById(userId);
        if(!user) throw new NotFoundError("User not found");

        return user;
    }

}