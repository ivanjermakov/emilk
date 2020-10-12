import {Component, Input, OnInit} from '@angular/core'
import {faCircle} from '@fortawesome/free-solid-svg-icons'
import {fadeInOutAnimation} from '../../util/animation'
import {StatusProvider} from '../../provider/status.provider'
import {filter} from 'rxjs/operators'
import {Target} from '../../model/Target'
import {Event} from '../../model/Event'

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
        private statusProvider: StatusProvider
    ) {}

    ngOnInit(): void {
        this.statusProvider.status.observable
            .pipe(
                filter(s => s.target === Target.MESSAGES),
                filter(s => [Event.LOADING, Event.LOADED].includes(s.event))
            )
            .subscribe(() => this.messagesActive = true)
    }

}
