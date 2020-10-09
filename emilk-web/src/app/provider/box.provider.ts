import {Injectable} from '@angular/core'
import {ObservableData} from '../util/observable-data'
import {Boxes} from '../model/Boxes'
import {AccountProvider} from './account.provider'
import {BoxService} from '../service/box.service'
import {distinctUntilChanged} from 'rxjs/operators'
import {Box} from '../model/Box'
import {LocalStorageManager} from '../util/local-storage-manager'
import {StatusProvider} from './status.provider'
import {Target} from '../model/Target'
import {Event} from '../model/Event'

@Injectable({
    providedIn: 'root'
})
export class BoxProvider {

    boxes: ObservableData<Boxes> = new ObservableData<Boxes>()
    currentBox: ObservableData<Box> = new ObservableData<Box>()
    defaultBoxManager: LocalStorageManager = new LocalStorageManager('defaultBoxMap', new Map<string, string>())

    constructor(
        private accountProvider: AccountProvider,
        private boxService: BoxService,
        private statusProvider: StatusProvider
    ) {
        this.accountProvider.currentAccount.observable
            .pipe(distinctUntilChanged())
            .subscribe(account => {
                this.boxes.set(null)
                this.statusProvider.status.set({target: Target.BOXES, event: Event.LOADING})
                this.currentBox.set(null)
                this.statusProvider.status.set({target: Target.CURRENT_BOX, event: Event.LOADING})

                if (!account) return

                this.boxService.all(account.user).subscribe(boxes => {
                    this.boxes.set(boxes)
                    this.statusProvider.status.set({target: Target.BOXES, event: Event.LOADED})

                    let currentBoxMap: Map<string, string> = new Map<string, string>(Object.entries(this.defaultBoxManager.get()))
                    if (currentBoxMap) {
                        const currentBox = currentBoxMap.get(account.user)
                        if (currentBox) {
                            this.boxService.getBox(account.user, currentBox)
                                .subscribe(box => {
                                    this.currentBox.set(box)
                                    this.statusProvider.status.set({target: Target.CURRENT_BOX, event: Event.LOADED})
                                })
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
