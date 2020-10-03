import {AccountService} from "./account.service"
import Connection from "imap"
import {Service} from "typedi"
import {User} from "../model/user.model"
import {ImapAccountModel} from "../model/imap-account.model"
import {Error} from "../error/error"

@Service()
export class ImapAccountService implements AccountService {

	addAccount(user: User, accountDetails: Connection.Config): Promise<void> {
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

	listAccounts(user: User): Promise<Connection.Config[]> {
		return ImapAccountModel
			.find({userEmail: user.email})
			.then(ds => ds.map(d => d.config))
	}

	getByEmail(email: string): Promise<Connection.Config> {
		return ImapAccountModel
			.findOne({email: email})
			.then(model => {
				if (!model) throw new Error(400, 'no account with such email')
				return model.config
			})
	}

	connect(user: User, accountDetails: Connection.Config): Promise<Connection> {
		return new Promise<Connection>((resolve, reject) => {
			const connection: Connection = new Connection(accountDetails)
			connection.connect()
			connection.once('ready', () => resolve(connection))
			connection.once('error', (e: any) => reject(e))
		})
	}

}
