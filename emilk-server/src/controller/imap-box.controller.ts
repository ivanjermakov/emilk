import {CurrentUser, Get, JsonController, QueryParam, Res} from "routing-controllers"
import {User} from "../model/user.model"
import {BoxService} from "../service/box.service"
import {AccountService} from "../service/account.service"
import {Response} from "express"
import Imap from "imap"

@JsonController('/box')
export class AccountController {

	constructor(
		private accountService: AccountService,
		private boxService: BoxService
	) {}

	@Get('/all')
	async all(@CurrentUser() user: User, @QueryParam('accountEmail') accountEmail: string, @Res() res: Response): Promise<Imap.MailBoxes> {
		return this.boxService
			.listBoxes(
				user,
				await this.accountService.connect(user, accountEmail)
			)
			.then(e => this.boxService.formatMailboxes(e))
	}

}
