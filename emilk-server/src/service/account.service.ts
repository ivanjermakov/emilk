import {Service} from "typedi"
import {User} from "../model/user.model"
import {Error} from "../error/error"
import Imap from "imap"
import {AccountRepository} from "../repository/account.repository"

@Service()
export class AccountService {

	constructor(
		private accountRepository: AccountRepository
	) {}

	addAccount(user: User, accountDetails: Imap.Config): Promise<void> {
		return this.accountRepository
			.create({
				userEmail: user.email,
				email: accountDetails.user,
				config: accountDetails
			})
			.then()
	}

	removeAccount(user: User, email: string): Promise<void> {
		return this.accountRepository
			.deleteByUserEmailAndEmail(user.email, email)
	}

	listAccounts(user: User): Promise<Imap.Config[]> {
		return this.accountRepository
			.findAllByUserEmail(user.email)
			.then(ds => ds.map(d => d.config))
	}

	getByEmail(email: string): Promise<Imap.Config> {
		return this.accountRepository
			.findByEmail(email)
			.then(model => {
				if (!model) throw new Error(400, 'no account with such email')
				return model.config
			})
	}

	/**
	 * TODO: cache connections
	 */
	async connect(user: User, accountEmail: string): Promise<Imap> {
		let connection = new Imap(await this.getByEmail(accountEmail))
		connection.connect()
		return new Promise<Imap>((resolve, reject) => {
			connection.once('ready', () => resolve(connection))
			connection.once('error', (e: any) => reject(new Error(400, e.message)))
		})
	}

}
