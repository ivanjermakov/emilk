import {Service} from "typedi"
import {User, UserModel} from "../model/user.model"

@Service()
export class UserRepository {

	findByEmail(email: string): Promise<User> {
		return UserModel
			.findOne({email})
			.then()
	}

	save(user: User): Promise<User> {
		return UserModel.create(user)
	}

}
