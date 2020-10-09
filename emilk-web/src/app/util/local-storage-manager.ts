export class LocalStorageManager {

    name: string
    defaultValue: any

    constructor(name: string, defaultValue?: any) {
        this.name = name
        this.defaultValue = defaultValue
        if (!this.get()) {
            defaultValue && this.set(defaultValue)
        }
    }

    get(): any | null {
        let item = localStorage.getItem(this.name)
        if (item === null) {
            return this.defaultValue
        } else {
            return JSON.parse(item)
        }
    }

    set(value: any): void {
        if (value === undefined) {
            this.remove()
        } else {
            localStorage.setItem(this.name, JSON.stringify(value))
        }
    }

    update(map: (value: any) => any): void {
        this.set(map(this.get()))
    }

    remove(): void {
        localStorage.removeItem(this.name)
    }

}
