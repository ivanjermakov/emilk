import {Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Put, QueryParam} from 'routing-controllers'
import {User} from '../model/user.model'
import {AccountService} from '../service/account.service'
import {Error} from '../error/error'
import {ConfigDto, fromImapConfig} from '../dto/config.dto'

@JsonController('/account')
export class AccountController {

    constructor(
        private accountService: AccountService
    ) {}

    @Put()
    @OnUndefined(204)
    add(@CurrentUser() user: User, @Body() accountDetails: ConfigDto): Promise<void> {
        return this.accountService
            .addAccount(user, accountDetails)
    }

    @Delete()
    @OnUndefined(204)
    remove(
        @CurrentUser() user: User,
        @QueryParam('accountEmail', {required: true}) accountEmail: string
    ): Promise<void> {
        return this.accountService.removeAccount(user, accountEmail)
    }

    @Get('/all')
    all(@CurrentUser() user: User): Promise<ConfigDto[]> {
        return this.accountService
            .listAccounts(user)
            .then(configs => configs.map(fromImapConfig))
    }

    @Get('/connect')
    @OnUndefined(204)
    connect(@CurrentUser() user: User, @QueryParam('accountEmail') accountEmail: string): Promise<void> {
        return this.accountService
            .connect(user, accountEmail)
            .then(() => {})
            .catch(e => { throw new Error(400, e.message)})
    }

}
