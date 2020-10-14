import {Injectable} from '@angular/core'
import {ObservableData} from '../util/observable-data'
import {Message} from '../model/Message'
import {MessagePreview} from '../model/MessagePreview'
import {BoxProvider} from './box.provider'
import {filter, first, map} from 'rxjs/operators'
import {MessageService} from '../service/message.service'
import {AccountProvider} from './account.provider'
import {environment} from '../../environments/environment'
import {StatusProvider} from './status.provider'
import {Target} from '../model/Target'
import {Event} from '../model/Event'
import {LocalStorageManager} from '../util/local-storage-manager'

@Injectable({
    providedIn: 'root'
})
export class MessageProvider {

    messagePreviews: ObservableData<MessagePreview[]> = new ObservableData<MessagePreview[]>()
    currentMessage: ObservableData<Message> = new ObservableData<Message>()
    /**
     * Key is in format `${accountName}/${boxName}/${uid}`
     */
    cachedMessagesManager: LocalStorageManager = new LocalStorageManager('cachedMessages', new Map<string, Message>())

    constructor(
        private messageService: MessageService,
        private accountProvider: AccountProvider,
        private boxProvider: BoxProvider,
        private statusProvider: StatusProvider
    ) {
        this.boxProvider.currentBox.observable
            .subscribe(box => {
                this.messagePreviews.set(null)
                this.statusProvider.status.set({target: Target.MESSAGES, event: Event.LOADING})
                this.currentMessage.set(null)
                this.statusProvider.status.set({target: Target.CURRENT_MESSAGE, event: Event.NOT_LOADED})
                if (!box) return

                this.accountProvider.currentAccount.observable
                    .pipe(
                        filter(a => !!a),
                        first(),
                        map(a => a.user)
                    )
                    .subscribe(email => {
                        this.messageService
                            .getPage(email, 0, environment.initFetchSize)
                            .subscribe(previews => {
                                this.messagePreviews.set(previews.reverse())
                                this.statusProvider.status.set({target: Target.MESSAGES, event: Event.LOADED})
                            })

                        this.currentMessage.observable
                            .pipe(filter(m => !!m))
                            .subscribe(message => {
                                const messageKey = [email, box.name, message.uid].join('/')
                                if (!new Map(Object.entries(this.cachedMessagesManager.get())).get(messageKey)) {
                                    this.cachedMessagesManager.update(obj => {
                                        obj[messageKey] = message
                                        return obj
                                    })
                                }
                            })
                    })
            })
    }

}
