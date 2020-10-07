import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import {Boxes} from '../../model/Boxes'
import {BoxProvider} from '../../provider/box.provider'

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
        private boxProvider: BoxProvider
    ) {}

    ngOnInit(): void {
        this.boxProvider.boxes.observable
            .subscribe(boxes => this.boxes = boxes)

        this.onBoxSelect
            .subscribe(box => this.boxProvider.currentBox.set(box))
    }

}
