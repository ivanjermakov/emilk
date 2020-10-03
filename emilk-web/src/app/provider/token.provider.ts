import {Injectable} from '@angular/core'
import {ObservableData} from "../util/ObservableData"
import {TokenService} from "../service/token.service"

@Injectable({
	providedIn: 'root'
})
export class TokenProvider {

	token: ObservableData<string> = new ObservableData<string>()

	constructor(
		private tokenService: TokenService
	) {
		this.token.set(this.tokenService.getLocalStorageToken() || '')
	}

	setToken(token: string): void {
		this.tokenService.setToken(token)
		this.token.set(token)
	}

}
