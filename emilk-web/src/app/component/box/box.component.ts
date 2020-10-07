import {Component, Input, OnChanges, OnInit} from '@angular/core'
import {Boxes, Folder} from '../../model/Boxes'

@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.sass']
})
export class BoxComponent implements OnInit, OnChanges {

    @Input()
    boxes: Boxes

    entries: [string, Folder][]

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges() {
        this.entries = Object.entries(this.boxes)
    }

}
