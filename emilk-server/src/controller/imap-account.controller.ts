import {Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Put, QueryParam} from "routing-controllers"
import {User} from "../model/user.model"
import {ImapAccountService} from "../service/imap-account.service"
import Connection from "imap"
import {Error} from "../error/error"

@JsonController('/account/imap')
export class ImapAccountController {

	constructor(
		private imapAccountService: ImapAccountService
	) {}

	@Put()
	@OnUndefined(204)
	add(@CurrentUser() user: User, @Body() accountDetails: Connection.Config): Promise<void> {
		return this.imapAccountService.addAccount(user, accountDetails)
	}

	@Delete()
	@OnUndefined(204)
	remove(@CurrentUser() user: User, @QueryParam('email', {required: true}) email: string): Promise<void> {
		return this.imapAccountService.removeAccount(user, email)
	}

	@Get('/all')
	all(@CurrentUser() user: User): Promise<Connection.Config[]> {
		return this.imapAccountService
			.listAccounts(user)
			.then(accounts => accounts.map(a => {
				delete (a as any).password
				return a
			}))
	}

	@Get('/connect')
	@OnUndefined(204)
	async connect(@CurrentUser() user: User, @QueryParam('email') email: string): Promise<void> {
		return this.imapAccountService
			.connect(
				user,
				await this.imapAccountService.getByEmail(email)
			)
			.then(() => {})
			.catch(e => { throw new Error(400, `unable to connect: ${e.toString()}`)})
	}

}
