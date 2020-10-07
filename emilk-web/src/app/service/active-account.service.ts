import {Injectable} from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class ActiveAccountService {

    name: string = 'activeAccount'

    constructor() {
    }

    get(): string | null {
        return localStorage.getItem(this.name)
    }

    set(activeAccount: string): void {
        if (activeAccount === '') {
            this.remove()
        } else {
            localStorage.setItem(this.name, activeAccount)
        }
    }

    remove(): void {
        localStorage.removeItem(this.name)
    }

}
