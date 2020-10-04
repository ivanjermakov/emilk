import Imap from "imap"
import {Service} from "typedi"
import {User} from "../model/user.model"
import {AccountService} from "./account.service"
import {ImapSimple} from "imap-simple"

@Service()
export class BoxService {

	constructor(
		private accountService: AccountService
	) {}

	async listBoxes(user: User, accountEmail: string): Promise<Imap.MailBoxes> {
		return new ImapSimple(await this.accountService.connect(user, accountEmail)).getBoxes()
	}

	async getBox(user: User, accountEmail: string, boxName: string): Promise<Imap.Box> {
		let connection = await this.accountService.connect(user, accountEmail)
		return new Promise<Imap.Box>((resole, reject) => {
			connection.openBox(boxName, (error, box) => {
				if (error) reject(error)
				resole(box)
			})
		})
	}

}
