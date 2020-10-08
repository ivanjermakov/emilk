import {Component, OnInit} from '@angular/core'
import {MessageProvider} from '../../provider/message.provider'
import {Message} from '../../model/Message'

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.sass']
})
export class MessageComponent implements OnInit {

    message: Message

    constructor(
        private messageProvider: MessageProvider
    ) { }

    ngOnInit(): void {
        this.messageProvider.currentMessage.observable
            .subscribe(message => this.message = message)
    }

}
