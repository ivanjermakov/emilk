import {CurrentUser, Get, JsonController, QueryParam} from 'routing-controllers'
import {User} from '../model/user.model'
import {BoxService} from '../service/box.service'
import {AccountService} from '../service/account.service'
import {fromImapMailboxes, MailboxesDto} from '../dto/mailboxes.dto'
import {BoxDto, fromImapBox} from '../dto/box.dto'

@JsonController('/box')
export class AccountController {

    constructor(
        private accountService: AccountService,
        private boxService: BoxService
    ) {}

    @Get()
    async getBox(
        @CurrentUser() user: User,
        @QueryParam('accountEmail') accountEmail: string,
        @QueryParam('boxName') boxName: string
    ): Promise<BoxDto> {
        return this.boxService
            .getBox(user, accountEmail, boxName)
            .then(fromImapBox)
    }

    @Get('/all')
    async all(@CurrentUser() user: User, @QueryParam('accountEmail') accountEmail: string): Promise<MailboxesDto> {
        return this.boxService
            .listBoxes(user, accountEmail)
            .then(fromImapMailboxes)
    }

}
