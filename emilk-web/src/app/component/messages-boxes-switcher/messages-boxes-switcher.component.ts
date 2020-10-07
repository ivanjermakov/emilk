import {Component, Input, OnInit} from '@angular/core'
import {faCircle} from '@fortawesome/free-solid-svg-icons'

@Component({
    selector: 'app-messages-boxes-switcher',
    templateUrl: './messages-boxes-switcher.component.html',
    styleUrls: ['./messages-boxes-switcher.component.sass']
})
export class MessagesBoxesSwitcherComponent implements OnInit {

    @Input()
    messagesActive: boolean = true

    faCircle = faCircle

    constructor() {}

    ngOnInit(): void {}

}
