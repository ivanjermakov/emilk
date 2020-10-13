import {Component, OnInit} from '@angular/core'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'

@Component({
    selector: 'app-no-message',
    templateUrl: './no-message.component.html',
    styleUrls: ['./no-message.component.sass']
})
export class NoMessageComponent implements OnInit {

    faEnvelope = faEnvelope

    constructor() { }

    ngOnInit(): void {
    }

}
