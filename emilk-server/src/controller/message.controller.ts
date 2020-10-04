import {Body, CurrentUser, Get, JsonController, Post, QueryParam} from 'routing-controllers'
import {User} from '../model/user.model'
import {MessageService} from '../service/message.service'
import {MessagePreviewDto} from '../dto/message-preview.dto'
import {MessageDto} from '../dto/message.dto'

@JsonController('/message')
export class AccountController {

    constructor(
        private messageService: MessageService
    ) {}

    @Post()
    async search(
        @CurrentUser() user: User,
        @QueryParam('accountEmail') accountEmail: string,
        @QueryParam('boxName') boxName: string,
        @Body() searchCriteria: any[]
    ): Promise<MessagePreviewDto[]> {
        return this.messageService
            .search(user, accountEmail, boxName, searchCriteria)
    }

    @Get()
    async getMessage(
        @CurrentUser() user: User,
        @QueryParam('accountEmail') accountEmail: string,
        @QueryParam('boxName') boxName: string,
        @QueryParam('messageUid') messageUid: number,
    ): Promise<MessageDto> {
        return this.messageService
            .get(user, accountEmail, boxName, messageUid)
    }

}
