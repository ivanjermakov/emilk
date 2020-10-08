import {Component, Input, OnInit} from '@angular/core'
import {MessagePreview} from '../../model/MessagePreview'
import {formatDateTime} from '../../util/date-time'

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

    formatDateTime(date: string): string {
        return formatDateTime(new Date(date))
    }

}
