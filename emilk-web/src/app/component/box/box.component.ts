import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core'
import {Boxes, Folder} from '../../model/Boxes'

@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.sass']
})
export class BoxComponent implements OnInit, OnChanges {

    @Input()
    boxes: Boxes

    @Output()
    onBoxSelect: EventEmitter<string> = new EventEmitter<string>()

    entries: [string, Folder][]

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges() {
        this.entries = Object.entries(this.boxes)
    }

}
