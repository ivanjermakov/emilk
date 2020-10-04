import {Injectable} from '@angular/core'
import {Observable} from "rxjs"
import {HttpClient} from "@angular/common/http"
import {TokenProvider} from "../provider/token.provider"
import {environment} from "../../environments/environment"
import {generateHttpOptionsWithTokenHeader} from "../util/generate-http-options-with-token-header"
import {first, mergeMap} from "rxjs/operators"
import {Box} from "../model/Box"
import {Boxes} from "../model/Boxes"

@Injectable({
	providedIn: 'root'
})
export class BoxService {

	url: string = `${environment.apiUrl}/box`

	constructor(
		private http: HttpClient,
		private tokenProvider: TokenProvider
	) {}

	all(accountEmail: string): Observable<Boxes> {
		return this.tokenProvider.token.observable
			.pipe(
				first(),
				mergeMap(token =>
					this.http.get<Boxes>(`${this.url}/all`, {
						params: {accountEmail},
						...generateHttpOptionsWithTokenHeader(token)
					})
				)
			)
	}

	getBox(accountEmail: string, boxName: string): Observable<Box> {
		return this.tokenProvider.token.observable
			.pipe(
				first(),
				mergeMap(token =>
					this.http.get<Box>(this.url, {
						params: {accountEmail, boxName},
						...generateHttpOptionsWithTokenHeader(token)
					})
				)
			)
	}

}
