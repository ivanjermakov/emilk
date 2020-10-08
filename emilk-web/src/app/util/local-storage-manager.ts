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
        console.log('get')
        let item = localStorage.getItem(this.name)
        if (item === null) {
            console.log(`not exist, return ${this.defaultValue}`)
            return this.defaultValue
        } else {
            console.log(`exist, return ${JSON.parse(item)}`)
            return JSON.parse(item)
        }
    }

    set(value: any): void {
        console.log(`set ${value}`)
        if (value === undefined) {
            this.remove()
        } else {
            localStorage.setItem(this.name, JSON.stringify(value))
        }
    }

    update(map: (value: any) => any): void {
        console.log('update')
        this.set(map(this.get()))
    }

    remove(): void {
        localStorage.removeItem(this.name)
    }

}
