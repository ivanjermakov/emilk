import {Component, OnInit} from '@angular/core'
import {Boxes} from '../../model/Boxes'
import {BoxesProvider} from '../../provider/boxes.provider'

@Component({
    selector: 'app-boxes',
    templateUrl: './boxes.component.html',
    styleUrls: ['./boxes.component.sass']
})
export class BoxesComponent implements OnInit {

    boxes: Boxes

    constructor(
        private boxesProvider: BoxesProvider
    ) {}

    ngOnInit(): void {
        this.boxesProvider.boxes.observable.subscribe(boxes => this.boxes = boxes)
    }

}
