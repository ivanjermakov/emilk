import {Component, OnInit} from '@angular/core'
import {Account} from '../../model/Account'
import {AccountProvider} from '../../provider/account.provider'
import {fadeInOutAnimation} from '../../util/animation'
import {filter} from 'rxjs/operators'

@Component({
    selector: 'app-left',
    templateUrl: './left.component.html',
    styleUrls: ['./left.component.sass'],
    animations: [
        fadeInOutAnimation
    ]
})
export class LeftComponent implements OnInit {

    accountsExpanded: boolean = false
    messagesActive: boolean

    accounts: Account[]
    currentAccount: Account

    constructor(
        private accountProvider: AccountProvider
    ) {}

    ngOnInit(): void {
        this.accountProvider.accounts.observable
            .pipe(filter(a => !!a))
            .subscribe(accounts => this.accounts = accounts)

        this.accountProvider.currentAccount.observable
            .pipe(filter(a => !!a))
            .subscribe(current => this.currentAccount = current)
    }

    setActive(account: Account) {
        this.accountProvider.setCurrent(account)
        this.accountsExpanded = false
        this.messagesActive = false
    }

}
