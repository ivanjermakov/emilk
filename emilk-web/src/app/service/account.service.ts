import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {TokenProvider} from '../provider/token.provider'
import {environment} from '../../environments/environment'
import {generateHttpOptionsWithTokenHeader} from '../util/generate-http-options-with-token-header'
import {first, mergeMap} from 'rxjs/operators'
import {Account} from '../model/Account'

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    url: string = `${environment.apiUrl}/account`

    constructor(
        private http: HttpClient,
        private tokenProvider: TokenProvider
    ) {}

    add(accountDetails: Account): Observable<void> {
        return this.tokenProvider.token.observable
            .pipe(
                first(),
                mergeMap(token =>
                    this.http.put<void>(this.url, accountDetails, generateHttpOptionsWithTokenHeader(token))
                )
            )
    }

    remove(accountEmail: string): Observable<void> {
        return this.tokenProvider.token.observable
            .pipe(
                first(),
                mergeMap(token =>
                    this.http.delete<void>(this.url, {
                        params: {accountEmail},
                        ...generateHttpOptionsWithTokenHeader(token)
                    })
                )
            )
    }

    all(): Observable<Account[]> {
        return this.tokenProvider.token.observable
            .pipe(
                first(),
                mergeMap(token =>
                    this.http.get<Account[]>(`${this.url}/all`, generateHttpOptionsWithTokenHeader(token))
                )
            )
    }

    connect(accountEmail: string): Observable<void> {
        return this.tokenProvider.token.observable
            .pipe(
                first(),
                mergeMap(token =>
                    this.http.get<void>(`${this.url}/connect`, {
                        params: {accountEmail},
                        ...generateHttpOptionsWithTokenHeader(token)
                    })
                )
            )
    }

}
