import {Component, Input, OnInit} from '@angular/core'
import {faCircle} from '@fortawesome/free-solid-svg-icons'
import {filter} from 'rxjs/operators'
import {MessageProvider} from '../../provider/message.provider'
import {fadeInOutAnimation} from '../../util/animation'

@Component({
    selector: 'app-messages-boxes-switcher',
    templateUrl: './messages-boxes-switcher.component.html',
    styleUrls: ['./messages-boxes-switcher.component.sass'],
    animations: [
        fadeInOutAnimation
    ]
})
export class MessagesBoxesSwitcherComponent implements OnInit {

    @Input()
    messagesActive: boolean = true

    faCircle = faCircle

    constructor(
        private messageProvider: MessageProvider
    ) {}

    ngOnInit(): void {
        this.messageProvider.messagePreviews.observable
            .pipe(filter(b => !!b))
            .subscribe(() => {
                this.messagesActive = true
            })
    }

}
