import {Injectable} from '@angular/core'
import {ObservableData} from '../util/observable-data'
import {Boxes} from '../model/Boxes'
import {AccountProvider} from './account.provider'
import {BoxService} from '../service/box.service'
import {distinctUntilChanged} from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class BoxProvider {

    boxes: ObservableData<Boxes> = new ObservableData<Boxes>()
    currentBox: ObservableData<string> = new ObservableData<string>()

    constructor(
        private accountProvider: AccountProvider,
        private boxService: BoxService
    ) {
        this.accountProvider.currentAccount.observable
            .pipe(distinctUntilChanged())
            .subscribe(account => {
                this.boxes.set(null)
                this.currentBox.set(null)
                if (!account) return

                this.boxService.all(account.user).subscribe(boxes => {
                    this.boxes.set(boxes)
                })
            })
    }

}
