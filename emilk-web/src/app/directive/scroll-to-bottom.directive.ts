import {Directive, EventEmitter, HostListener, Output} from '@angular/core'

@Directive({
    selector: '[appScrollToBottom]'
})
export class ScrollToBottomDirective {

    @Output()
    onBottom: EventEmitter<void> = new EventEmitter<void>()

    constructor() {}

    @HostListener('scroll', ['$event'])
    onScroll(event) {
        let target = event.target
        let limit = target.scrollHeight - target.clientHeight
        if (event.target.scrollTop === limit) {
            this.onBottom.emit()
        }
    }

}
