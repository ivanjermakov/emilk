import {Component, OnInit} from '@angular/core'
import {Account} from '../../model/Account'
import {AccountsProvider} from '../../provider/accounts.provider'
import {ActiveAccountService} from '../../service/active-account.service'
import {filter} from 'rxjs/operators'
import {fadeInOutAnimation} from '../../util/animation'

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
    activeAccount: Account

    constructor(
        private accountsProvider: AccountsProvider,
        private activeAccountService: ActiveAccountService
    ) {}

    ngOnInit(): void {
        this.accountsProvider.accounts.observable
            .pipe(filter(a => !!a))
            .subscribe(accounts => {
                this.accounts = accounts
                let activeAccountEmail = this.activeAccountService.get()
                let activeAccount = this.accounts.find(a => activeAccountEmail && a.user === activeAccountEmail)
                // TODO: activeAccountProvider
                if (activeAccount) {
                    this.activeAccount = activeAccount
                } else {
                    this.activeAccount = this.accounts[0]
                }
            })
    }

    setActive(account: Account) {
        this.activeAccountService.set(account.user)
        this.accountsProvider.accounts.update()
        this.accountsExpanded = false
    }

}
