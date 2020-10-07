import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

@Component({
    selector: 'app-account-action',
    templateUrl: './account-action.component.html',
    styleUrls: ['./account-action.component.sass']
})
export class AccountActionComponent implements OnInit {

    @Input()
    iconClass: string

    @Input()
    text: string

    @Output()
    onAction: EventEmitter<void> = new EventEmitter<void>()

    constructor() {}

    ngOnInit(): void {}

}
