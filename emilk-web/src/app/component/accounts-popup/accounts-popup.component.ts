import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core'
import {Account} from '../../model/Account'

@Component({
    selector: 'app-accounts-popup',
    templateUrl: './accounts-popup.component.html',
    styleUrls: ['./accounts-popup.component.sass']
})
export class AccountsPopupComponent implements OnInit, OnChanges {

    @Input()
    accounts: Account[]

    @Input()
    activeAccount: Account

    @Output()
    onActiveAccountChange: EventEmitter<Account> = new EventEmitter<Account>()

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges) {
        this.accounts = this.accounts.sort((a, b) => {
            if (a.user === this.activeAccount.user) return -1
            if (b.user === this.activeAccount.user) return 1
            return a.user > b.user ? 1 : -1
        })
    }

}
