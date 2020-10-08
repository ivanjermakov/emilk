import {Injectable} from '@angular/core'
import {ObservableData} from '../util/observable-data'
import {Message} from '../model/Message'
import {MessagePreview} from '../model/MessagePreview'
import {BoxProvider} from './box.provider'
import {filter, first, map} from 'rxjs/operators'
import {MessageService} from '../service/message.service'
import {AccountProvider} from './account.provider'
import {environment} from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class MessageProvider {

    messagePreviews: ObservableData<MessagePreview[]> = new ObservableData<MessagePreview[]>()
    currentMessage: ObservableData<Message> = new ObservableData<Message>()

    constructor(
        private messageService: MessageService,
        private accountProvider: AccountProvider,
        private boxProvider: BoxProvider
    ) {
        this.boxProvider.currentBox.observable
            .subscribe(box => {
                this.messagePreviews.set(null)
                this.currentMessage.set(null)
                if (!box) return

                this.accountProvider.currentAccount.observable
                    .pipe(
                        filter(a => !!a),
                        first(),
                        map(a => a.user)
                    )
                    .subscribe(email =>
                        this.messageService
                            .getPage(email, 0, environment.initFetchSize)
                            .subscribe(previews => this.messagePreviews.set(previews.reverse()))
                    )
            })
    }

}
