import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {MessagePreview} from '../model/MessagePreview'
import {Message} from '../model/Message'
import {environment} from '../../environments/environment'
import {first, mergeMap} from 'rxjs/operators'
import {generateHttpOptionsWithTokenHeader} from '../util/generate-http-options-with-token-header'
import {TokenProvider} from '../provider/token.provider'

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    url: string = `${environment.apiUrl}/message`

    constructor(
        private http: HttpClient,
        private tokenProvider: TokenProvider
    ) {}

    search(accountEmail: string, boxName: string, searchCriteria: any[]): Observable<MessagePreview[]> {
        return this.tokenProvider.token.observable
            .pipe(
                first(),
                mergeMap(token =>
                    this.http.post<MessagePreview[]>(this.url, searchCriteria, {
                        params: {accountEmail, boxName},
                        ...generateHttpOptionsWithTokenHeader(token)
                    })
                )
            )
    }

    getMessage(accountEmail: string, boxName: string, messageUid: number,): Observable<Message> {
        return this.tokenProvider.token.observable
            .pipe(
                first(),
                mergeMap(token =>
                    this.http.get<Message>(this.url, {
                        params: {accountEmail, boxName, messageUid: messageUid.toString()},
                        ...generateHttpOptionsWithTokenHeader(token)
                    })
                )
            )
    }

}
