import {Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Put, QueryParam} from "routing-controllers"
import {User} from "../model/user.model"
import {ImapAccountService} from "../service/imap-account.service"
import Imap from "imap"
import {Error} from "../error/error"

@JsonController('/account/imap')
export class ImapAccountController {

	constructor(
		private imapAccountService: ImapAccountService
	) {}

	@Put()
	@OnUndefined(204)
	add(@CurrentUser() user: User, @Body() accountDetails: Imap.Config): Promise<void> {
		return this.imapAccountService.addAccount(user, accountDetails)
	}

	@Delete()
	@OnUndefined(204)
	remove(
		@CurrentUser() user: User,
		@QueryParam('accountEmail', {required: true}) accountEmail: string
	): Promise<void> {
		return this.imapAccountService.removeAccount(user, accountEmail)
	}

	@Get('/all')
	all(@CurrentUser() user: User): Promise<Imap.Config[]> {
		return this.imapAccountService
			.listAccounts(user)
			.then(accounts => accounts.map(a => {
				delete (a as any).password
				return a
			}))
	}

	@Get('/connect')
	@OnUndefined(204)
	connect(@CurrentUser() user: User, @QueryParam('accountEmail') accountEmail: string): Promise<void> {
		return this.imapAccountService
			.connect(user, accountEmail)
			.then(() => {})
			.catch(e => { throw new Error(400, e.message)})
	}

}
