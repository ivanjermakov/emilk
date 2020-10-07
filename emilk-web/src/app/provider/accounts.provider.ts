import {Injectable} from '@angular/core'
import {ObservableData} from '../util/observable-data'
import {Account} from '../model/Account'

@Injectable({
    providedIn: 'root'
})
export class AccountsProvider {

    accounts: ObservableData<Account[]> = new ObservableData<Account[]>()

    constructor() {}

}
