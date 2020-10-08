import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import {Boxes} from '../../model/Boxes'
import {BoxProvider} from '../../provider/box.provider'
import {BoxService} from '../../service/box.service'
import {AccountProvider} from '../../provider/account.provider'
import {filter, first, map} from 'rxjs/operators'

@Component({
    selector: 'app-boxes',
    templateUrl: './boxes.component.html',
    styleUrls: ['./boxes.component.sass']
})
export class BoxesComponent implements OnInit {

    @Output()
    onBoxSelect: EventEmitter<string> = new EventEmitter<string>()

    boxes: Boxes

    constructor(
        private boxProvider: BoxProvider,
        private accountProvider: AccountProvider,
        private boxService: BoxService
    ) {}

    ngOnInit(): void {
        this.boxProvider.boxes.observable
            .subscribe(boxes => this.boxes = boxes)

        this.onBoxSelect
            .subscribe(boxName => {
                this.boxProvider.currentBox.observable
                    .pipe(first())
                    .subscribe(currentBox => {
                        if (boxName === currentBox.name) return

                        this.accountProvider.currentAccount.observable
                            .pipe(
                                filter(a => !!a),
                                first(),
                                map(a => a.user)
                            )
                            .subscribe(email =>
                                this.boxService.getBox(email, boxName)
                                    .subscribe(box => this.boxProvider.setCurrent(email, box))
                            )
                    })
            })
    }

}
