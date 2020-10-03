import {AccountService} from "./account.service"
import {Service} from "typedi"
import {User} from "../model/user.model"
import {ImapAccountModel} from "../model/imap-account.model"
import {Error} from "../error/error"
import {connect, ImapSimple} from "imap-simple"
import Imap from "imap"

@Service()
export class ImapAccountService implements AccountService {

	addAccount(user: User, accountDetails: Imap.Config): Promise<void> {
		return ImapAccountModel
			.create({
				userEmail: user.email,
				email: accountDetails.user,
				config: accountDetails
			})
			.then((d) => {console.log(d)})
	}

	removeAccount(user: User, email: string): Promise<void> {
		return ImapAccountModel
			.deleteOne({userEmail: user.email, email: email})
			.then(() => {})
	}

	listAccounts(user: User): Promise<Imap.Config[]> {
		return ImapAccountModel
			.find({userEmail: user.email})
			.then(ds => ds.map(d => d.config))
	}

	getByEmail(email: string): Promise<Imap.Config> {
		return ImapAccountModel
			.findOne({email: email})
			.then(model => {
				if (!model) throw new Error(400, 'no account with such email')
				return model.config
			})
	}

	/**
	 * TODO: cache connections
	 */
	async connect(user: User, accountEmail: string): Promise<ImapSimple> {
		return connect({imap: await this.getByEmail(accountEmail)})
	}

}
