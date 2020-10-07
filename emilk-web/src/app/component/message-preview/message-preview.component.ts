import {Component, Input, OnInit} from '@angular/core'
import {MessagePreview} from '../../model/MessagePreview'

@Component({
    selector: 'app-message-preview',
    templateUrl: './message-preview.component.html',
    styleUrls: ['./message-preview.component.sass']
})
export class MessagePreviewComponent implements OnInit {

    @Input()
    messagePreview: MessagePreview

    constructor() {}

    ngOnInit(): void {}

}
