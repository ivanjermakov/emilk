import {Injectable} from '@angular/core'
import {ObservableData} from '../util/observable-data'
import {Status} from '../model/Status'
import {Target} from '../model/Target'
import {Event} from '../model/Event'
import {filter, first} from 'rxjs/operators'


@Injectable({
    providedIn: 'root'
})
export class StatusProvider {

    initMap = new Map<Target, Event>()
        .set(Target.ACCOUNTS, Event.NOT_LOADED)
        .set(Target.CURRENT_ACCOUNT, Event.NOT_LOADED)
        .set(Target.BOXES, Event.NOT_LOADED)
        .set(Target.CURRENT_BOX, Event.NOT_LOADED)
        .set(Target.MESSAGES, Event.NOT_LOADED)
        .set(Target.CURRENT_MESSAGE, Event.NOT_LOADED)

    status: ObservableData<Status> = new ObservableData<Status>()
    currentStatusMap: ObservableData<Map<Target, Event>> = new ObservableData<Map<Target, Event>>(this.initMap)

    constructor() {
        this.status.observable
            .pipe(filter(s => !!s))
            .subscribe(status => {
                console.log(status)
                this.currentStatusMap.observable
                    .pipe(first())
                    .subscribe(map =>
                        this.currentStatusMap.set(map.set(status.target, status.event))
                    )
            })
    }

}
