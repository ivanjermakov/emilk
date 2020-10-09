import {Component, OnInit} from '@angular/core'
import {MessageProvider} from '../../provider/message.provider'
import {Message} from '../../model/Message'
import {StatusProvider} from '../../provider/status.provider'
import {map} from 'rxjs/operators'
import {Target} from '../../model/Target'
import {Event} from '../../model/Event'

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.sass']
})
export class MessageComponent implements OnInit {

    message: Message
    active: boolean = false
    loading: boolean = true

    constructor(
        private messageProvider: MessageProvider,
        private statusProvider: StatusProvider
    ) {}

    ngOnInit(): void {
        this.messageProvider.currentMessage.observable
            .subscribe(message => this.message = message)

        this.statusProvider.currentStatusMap.observable
            .pipe(
                map(map => map.get(Target.CURRENT_MESSAGE))
            )
            .subscribe(event => {
                switch (event) {
                    case Event.NOT_LOADED:
                        this.active = false
                        this.loading = false
                        break
                    case Event.LOADED:
                        this.active = true
                        this.loading = false
                        break
                    case Event.LOADING:
                        this.active = false
                        this.loading = true
                }
            })
    }

}
