import {Injectable} from '@angular/core'
import {ObservableData} from '../util/observable-data'
import {Account} from '../model/Account'
import {filter} from 'rxjs/operators'
import {LocalStorageManager} from '../util/local-storage-manager'

@Injectable({
    providedIn: 'root'
})
export class AccountProvider {

    accounts: ObservableData<Account[]> = new ObservableData<Account[]>()
    currentAccount: ObservableData<Account> = new ObservableData<Account>()
    currentAccountManager: LocalStorageManager = new LocalStorageManager('currentAccount')

    constructor() {
        this.accounts.observable
            .pipe(filter(a => !!a))
            .subscribe(accounts => {
                let activeAccountEmail = this.currentAccountManager.get()
                let activeAccount = accounts.find(a => activeAccountEmail && a.user === activeAccountEmail)
                if (activeAccount) {
                    this.currentAccount.set(activeAccount)
                } else {
                    this.currentAccount.set(this.accounts[0])
                }
            })
    }

    setCurrent(account: Account): void {
        this.currentAccountManager.set(account.user)
        this.currentAccount.set(account)
    }

}
