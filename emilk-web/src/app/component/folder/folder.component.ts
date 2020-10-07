import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Folder} from '../../model/Boxes'
import {faCaretRight} from '@fortawesome/free-solid-svg-icons'
import {slideFromLeftAnimation} from '../../util/animation'

@Component({
    selector: 'app-folder',
    templateUrl: './folder.component.html',
    styleUrls: ['./folder.component.sass'],
    animations: [
        slideFromLeftAnimation
    ]
})
export class FolderComponent implements OnInit {

    @Input()
    name: string

    @Input()
    folder: Folder

    @Output()
    onBoxSelect: EventEmitter<string> = new EventEmitter<string>()

    expanded: boolean = false
    isFolder: boolean

    faCaretRight = faCaretRight

    constructor() {}

    ngOnInit(): void {
        this.isFolder = Object.keys(this.folder.children).length !== 0
    }

    toggleClickOrExpand() {
        if (this.isFolder) {
            this.expanded = !this.expanded
        } else {
            this.onBoxSelect.emit(this.name)
        }
    }
}
