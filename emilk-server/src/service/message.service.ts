import {Service} from 'typedi'
import {User} from '../model/user.model'
import {AccountService} from './account.service'
import {ImapSimple, Message} from 'imap-simple'
import {simpleParser} from 'mailparser'
import * as _ from 'lodash'
import {MessagePreviewDto} from '../dto/message-preview.dto'
import {MessageDto} from '../dto/message.dto'

@Service()
export class MessageService {

    headerSelector: string = 'HEADER.FIELDS (FROM TO SUBJECT DATE)'

    constructor(
        private accountService: AccountService
    ) {}

    async search(user: User, accountEmail: string, boxName: string, searchCriteria: any[]): Promise<MessagePreviewDto[]> {
        let connection = new ImapSimple(await this.accountService.connect(user, accountEmail))
        return connection
            .openBox(boxName)
            .then(() => connection.search(searchCriteria, {bodies: [this.headerSelector], struct: true}))
            .then(messages => Promise.all(messages.map(message => this.parseHeader(message))))
    }

    async get(user: User, accountEmail: string, boxName: string, messageUid: number): Promise<MessageDto> {
        let connection = new ImapSimple(await this.accountService.connect(user, accountEmail))
        return connection
            .openBox(boxName)
            .then(() => connection.search([['UID', messageUid]], {bodies: [this.headerSelector, '']}))
            .then(messages => messages[0])
            .then(message => this.parseMessage(message))
    }

    private parseHeader(message: Message): MessagePreviewDto {
        const header = _.find(message.parts, {'which': this.headerSelector})!.body
        return {
            uid: message.attributes.uid,
            from: header.from[0],
            to: header.to,
            date: new Date(header.date),
            subject: header.subject ? header.subject[0] : null
        }
    }

    private parseBody(message: Message): Promise<string> {
        const body = _.find(message.parts, {'which': ''})!.body
        return simpleParser(body)
            .then(mail => String(mail.html ? mail.html : mail.text))
    }

    private async parseMessage(message: Message): Promise<MessageDto> {
        const header = this.parseHeader(message)
        const body = await this.parseBody(message)
        return {
            uid: message.attributes.uid,
            from: header.from,
            to: header.to,
            date: header.date,
            subject: header.subject,
            body: body
        }
    }

}
