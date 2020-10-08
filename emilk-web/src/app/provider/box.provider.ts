import {Injectable} from '@angular/core'
import {ObservableData} from '../util/observable-data'
import {Boxes} from '../model/Boxes'
import {AccountProvider} from './account.provider'
import {BoxService} from '../service/box.service'
import {distinctUntilChanged} from 'rxjs/operators'
import {Box} from '../model/Box'
import {LocalStorageManager} from '../util/local-storage-manager'

@Injectable({
    providedIn: 'root'
})
export class BoxProvider {

    boxes: ObservableData<Boxes> = new ObservableData<Boxes>()
    currentBox: ObservableData<Box> = new ObservableData<Box>()
    defaultBoxManager: LocalStorageManager = new LocalStorageManager('defaultBoxMap', new Map<string, string>())

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

                    let currentBoxMap: Map<string, string> = new Map<string, string>(Object.entries(this.defaultBoxManager.get()))
                    if (currentBoxMap) {
                        const currentBox = currentBoxMap.get(account.user)
                        if (currentBox) {
                            this.boxService.getBox(account.user, currentBox)
                                .subscribe(box => this.currentBox.set(box))
                        }
                    }
                })
            })
    }

    setCurrent(accountEmail: string, box: Box): void {
        this.currentBox.set(box)
        this.defaultBoxManager.update(obj => {
            obj[accountEmail] = box.name
            return obj
        })
    }

}
