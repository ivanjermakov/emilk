import {Injectable} from "@angular/core"
import {environment} from "../../environments/environment"

@Injectable({
	providedIn: 'root'
})
export class TokenService {

	name: string = environment.tokenHeaderName

	constructor() {
	}

	get(): string | null {
		return localStorage.getItem(this.name)
	}

	set(token: string): void {
		if (token === '') {
			this.remove()
		} else {
			localStorage.setItem(this.name, token)
		}
	}

	remove(): void {
		localStorage.removeItem(this.name)
	}

}
