import {Component, OnInit} from '@angular/core'
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons'

@Component({
    selector: 'app-expand-icon',
    templateUrl: './expand-icon.component.html',
    styleUrls: ['./expand-icon.component.sass']
})
export class ExpandIconComponent implements OnInit {

    faChevronUp = faChevronUp
    faChevronDown = faChevronDown

    constructor() {}

    ngOnInit(): void {}

}
