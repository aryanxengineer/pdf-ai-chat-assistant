import UserModel, { IUser } from "@modules/user/user.model.js"
import { SignupInput } from "./auth.validation.js";

export class AuthRepository {
    constructor() { }

    findUserByEmail = async (email: string) => {
        return UserModel.findOne({ email }).select("_id name email password role");
    }

    createNewUser = async (user: SignupInput) => {
        return UserModel.create(user);
    }

    updateRole = async (userId: string, role: string) => {
        return UserModel.findOneAndUpdate({ _id: userId }, { role }, { returnDocument: 'after' }).lean();
    }
}