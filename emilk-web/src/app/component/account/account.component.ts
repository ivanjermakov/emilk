import {Component, Input, OnInit} from '@angular/core'
import {Account} from '../../model/Account'
import {faCheck, faUser} from '@fortawesome/free-solid-svg-icons'

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {

    @Input()
    account: Account

    @Input()
    active: boolean

    @Input()
    expanded: boolean = false

    faUser = faUser
    faCheck = faCheck

    constructor() {}

    ngOnInit(): void {}

}
