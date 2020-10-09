import {Component, OnInit} from '@angular/core'
import {MessagePreview} from '../../model/MessagePreview'
import {MessageProvider} from '../../provider/message.provider'
import {MessageService} from '../../service/message.service'
import {filter, first, map} from 'rxjs/operators'
import {AccountProvider} from '../../provider/account.provider'
import {environment} from '../../../environments/environment'
import {BoxProvider} from '../../provider/box.provider'
import {StatusProvider} from '../../provider/status.provider'
import {Target} from '../../model/Target'
import {Event} from '../../model/Event'

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.sass']
})
export class MessagesComponent implements OnInit {

    messagePreviews: MessagePreview[]

    constructor(
        private messageProvider: MessageProvider,
        private accountProvider: AccountProvider,
        private boxProvider: BoxProvider,
        private messageService: MessageService,
        private statusProvider: StatusProvider
    ) {}

    ngOnInit(): void {
        this.messageProvider.messagePreviews.observable
            .subscribe(previews => {
                this.messagePreviews = previews
            })
    }

    openMessage(preview: MessagePreview) {
        this.messageProvider.currentMessage.set(null)
        this.statusProvider.status.set({target: Target.CURRENT_MESSAGE, event: Event.LOADING})

        this.accountProvider.currentAccount.observable
            .pipe(
                filter(a => !!a),
                first(),
                map(account => account.user)
            )
            .subscribe(email =>
                this.boxProvider.currentBox.observable
                    .pipe(
                        filter(a => !!a),
                        first(),
                        map(box => box.name)
                    )
                    .subscribe(boxName =>
                        this.messageService.getMessage(email, boxName, preview.uid)
                            .subscribe(message => {
                                this.messageProvider.currentMessage.set(message)
                                this.statusProvider.status.set({target: Target.CURRENT_MESSAGE, event: Event.LOADED})
                            })
                    )
            )
    }

    fetchMore() {
        this.statusProvider.status.set({target: Target.FETCH_MORE_MESSAGES, event: Event.LOADING})
        const pageSize = environment.pageSize
        const pagesFetched = this.messagePreviews.length / pageSize
        this.accountProvider.currentAccount.observable
            .pipe(
                filter(a => !!a),
                first(),
                map(a => a.user)
            )
            .subscribe(email =>
                this.messageService
                    .getPage(email, pagesFetched, pageSize)
                    .subscribe(previews => {
                        this.messageProvider.messagePreviews.set([...this.messagePreviews, ...previews.reverse()])
                        this.statusProvider.status.set({target: Target.FETCH_MORE_MESSAGES, event: Event.LOADED})
                    })
            )
    }
}
