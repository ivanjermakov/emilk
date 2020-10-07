import {Component, OnInit} from '@angular/core'
import {MessagePreview} from '../../model/MessagePreview'
import {MessageProvider} from '../../provider/message.provider'

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.sass']
})
export class MessagesComponent implements OnInit {

    messagePreviews: MessagePreview[]

    constructor(
        private messageProvider: MessageProvider
    ) {}

    ngOnInit(): void {
        this.messageProvider.messagePreviews.observable
            .subscribe(previews => {
                this.messagePreviews = previews
            })
    }

}
