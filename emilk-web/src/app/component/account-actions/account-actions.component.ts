import {Component, OnInit} from '@angular/core'
import {faCog, faLayerGroup, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'

@Component({
    selector: 'app-account-actions',
    templateUrl: './account-actions.component.html',
    styleUrls: ['./account-actions.component.sass']
})
export class AccountActionsComponent implements OnInit {

    faPlus = faPlus
    faLayerGroup = faLayerGroup
    faTrash = faTrash
    faCog = faCog

    constructor() { }

    ngOnInit(): void {
    }

}
