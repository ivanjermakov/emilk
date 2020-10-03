import {Service} from "typedi"
import {Account, AccountDocument, AccountModel} from "../model/account.model"

@Service()
export class AccountRepository {

	create(account: Account): Promise<Account> {
		return AccountModel.create(account)
	}

	deleteByUserEmailAndEmail(userEmail: string, email: string): Promise<void> {
		return AccountModel
			.deleteOne({userEmail: userEmail, email: email})
			.then()
	}

	findAllByUserEmail(userEmail: string): Promise<AccountDocument[]> {
		return AccountModel
			.find({userEmail: userEmail})
			.then()
	}

	findByEmail(email: string): Promise<AccountDocument> {
		return AccountModel
			.findOne({email: email})
			.then()
	}

}
