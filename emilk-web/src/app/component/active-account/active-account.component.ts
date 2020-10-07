import {Component, Input, OnInit} from '@angular/core'
import {Account} from '../../model/Account'

@Component({
    selector: 'app-active-account',
    templateUrl: './active-account.component.html',
    styleUrls: ['./active-account.component.sass']
})
export class ActiveAccountComponent implements OnInit {

    @Input()
    account: Account

    constructor() {}

    ngOnInit(): void {}

}
