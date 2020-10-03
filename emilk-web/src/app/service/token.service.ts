import {Injectable} from "@angular/core"
import {environment} from "../../environments/environment"

@Injectable({
	providedIn: 'root'
})
export class TokenService {

	constructor() {
	}

	getLocalStorageToken(): string | null {
		return localStorage.getItem(environment.tokenHeaderName)
	}

	setToken(token: string): void {
		if (token === '') {
			this.removeLocalStorageToken()
		} else {
			localStorage.setItem(environment.tokenHeaderName, token)
		}
	}

	removeLocalStorageToken(): void {
		localStorage.removeItem(environment.tokenHeaderName)
	}

}
