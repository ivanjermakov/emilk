import {Promise} from "mongoose"
import {User} from "../model/user.model"

export interface AccountService {

	addAccount(user: User, accountDetails: any): Promise<void>

	removeAccount(user: User, accountDetails: any): Promise<void>

	listAccounts(user: User): Promise<any>

	connect(user: User, accountDetails: any): Promise<any>

}

