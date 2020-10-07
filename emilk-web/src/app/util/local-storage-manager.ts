export class LocalStorageManager {

    name: string

    constructor(name: string) {
        this.name = name
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
