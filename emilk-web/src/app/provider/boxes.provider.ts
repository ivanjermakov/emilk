import {Injectable} from '@angular/core'
import {ObservableData} from '../util/observable-data'
import {Boxes} from '../model/Boxes'
import {AccountsProvider} from './accounts.provider'
import {filter} from 'rxjs/operators'
import {BoxService} from '../service/box.service'
import {ActiveAccountService} from '../service/active-account.service'

@Injectable({
    providedIn: 'root'
})
export class BoxesProvider {

    boxes: ObservableData<Boxes> = new ObservableData<Boxes>()

    constructor(
        private accountsProvider: AccountsProvider,
        private activeAccountService: ActiveAccountService,
        private boxService: BoxService
    ) {
        this.accountsProvider.accounts.observable
            .pipe(filter(a => !!a))
            .subscribe(accounts => {
                let activeAccountEmail = this.activeAccountService.get()
                let activeAccount = accounts.find(a => activeAccountEmail && a.user === activeAccountEmail)
                if (!activeAccount) {
                    activeAccount = accounts[0]
                }
                this.boxService.all(activeAccount.user).subscribe(boxes => {
                    this.boxes.set(boxes)
                })
            })
    }

}
