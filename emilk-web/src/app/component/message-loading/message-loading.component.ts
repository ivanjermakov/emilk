import {Component, OnInit} from '@angular/core'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'

@Component({
    selector: 'app-message-loading',
    templateUrl: './message-loading.component.html',
    styleUrls: ['./message-loading.component.sass']
})
export class MessageLoadingComponent implements OnInit {

    faSpinner = faSpinner

    constructor() { }

    ngOnInit(): void {
    }

}
