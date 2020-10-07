import {Injectable} from '@angular/core'
import {ObservableData} from '../util/observable-data'
import {Account} from '../model/Account'
import {filter} from 'rxjs/operators'
import {ActiveAccountService} from '../service/active-account.service'

@Injectable({
    providedIn: 'root'
})
export class AccountProvider {

    accounts: ObservableData<Account[]> = new ObservableData<Account[]>()
    currentAccount: ObservableData<Account> = new ObservableData<Account>()

    constructor(
        private activeAccountService: ActiveAccountService
    ) {
        this.accounts.observable
            .pipe(filter(a => !!a))
            .subscribe(accounts => {
                let activeAccountEmail = this.activeAccountService.get()
                let activeAccount = accounts.find(a => activeAccountEmail && a.user === activeAccountEmail)
                if (activeAccount) {
                    this.currentAccount.set(activeAccount)
                } else {
                    this.currentAccount.set(this.accounts[0])
                }
            })
    }

}
