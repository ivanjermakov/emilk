import {Component, OnInit} from '@angular/core'
import {Account} from '../../model/Account'
import {AccountProvider} from '../../provider/account-provider.service'
import {ActiveAccountService} from '../../service/active-account.service'
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
    accounts: Account[]
    currentAccount: Account

    constructor(
        private accountsProvider: AccountProvider,
        private activeAccountService: ActiveAccountService
    ) {}

    ngOnInit(): void {
        this.accountsProvider.accounts.observable
            .pipe(filter(a => !!a))
            .subscribe(accounts => this.accounts = accounts)

        this.accountsProvider.currentAccount.observable
            .pipe(filter(a => !!a))
            .subscribe(current => this.currentAccount = current)
    }

    setActive(account: Account) {
        this.activeAccountService.set(account.user)
        this.accountsProvider.currentAccount.set(account)
        this.accountsExpanded = false
    }

}
