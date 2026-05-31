import UserModel from "./user.model.js"

export class UserRepository {
    constructor() {}
    
    findById = async (userId: string) => {
        return UserModel.findById(userId);
    }
}