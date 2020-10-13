import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import {Boxes} from '../../model/Boxes'
import {BoxProvider} from '../../provider/box.provider'
import {BoxService} from '../../service/box.service'
import {AccountProvider} from '../../provider/account.provider'
import {filter, first, map} from 'rxjs/operators'
import {StatusProvider} from '../../provider/status.provider'
import {Target} from '../../model/Target'
import {Event} from '../../model/Event'

@Component({
    selector: 'app-boxes',
    templateUrl: './boxes.component.html',
    styleUrls: ['./boxes.component.sass']
})
export class BoxesComponent implements OnInit {

    @Output()
    onBoxSelect: EventEmitter<string> = new EventEmitter<string>()

    boxes: Boxes
    lastEvent: Event = Event.NOT_LOADED

    constructor(
        private boxProvider: BoxProvider,
        private accountProvider: AccountProvider,
        private boxService: BoxService,
        private statusProvider: StatusProvider
    ) {}

    ngOnInit(): void {
        this.boxProvider.boxes.observable
            .subscribe(boxes => this.boxes = boxes)

        this.onBoxSelect
            .subscribe(boxName => {
                this.statusProvider.status.set({target: Target.BOXES, event: Event.LOADING})
                this.boxProvider.currentBox.observable
                    .pipe(first())
                    .subscribe(currentBox => {
                        if (boxName === currentBox.name) {
                            this.boxProvider.currentBox.update()
                            this.statusProvider.status.set({target: Target.BOXES, event: Event.LOADED})
                            return
                        }

                        this.accountProvider.currentAccount.observable
                            .pipe(
                                filter(a => !!a),
                                first(),
                                map(a => a.user)
                            )
                            .subscribe(email =>
                                this.boxService.getBox(email, boxName)
                                    .subscribe(box => {
                                        this.boxProvider.setCurrent(email, box)
                                        this.statusProvider.status.set({target: Target.BOXES, event: Event.LOADED})
                                    })
                            )
                    })
            })

        this.statusProvider.status.observable
            .pipe(
                filter(s => s.target === Target.BOXES),
                map(s => s.event)
            )
            .subscribe(event => this.lastEvent = event)
    }

}
