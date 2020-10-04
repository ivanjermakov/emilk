import {Service} from "typedi"
import Imap from "imap"
import {config} from "../config"

@Service()
export class AccountCachingService {

	activeConnections: Map<string, Imap> = new Map<string, Imap>()
	bufferSize: number

	constructor() {
		this.bufferSize = Number(config.CONNECTION_CACHE_SIZE)
	}

	cache(email: string, connection: Imap): void {
		console.debug('connection is saved to cache')
		this.activeConnections.set(email, connection)
		setTimeout(() => {
			if (this.activeConnections.size > this.bufferSize) {
				this.invalidateOld(this.activeConnections.size - this.bufferSize)
			}
		}, 0)
	}

	get(email: string): Imap | undefined {
		console.debug(`cached connections: ${this.activeConnections.size}`)
		return this.activeConnections.get(email)
	}

	invalidate(email: string): void {
		this.activeConnections.delete(email)
	}

	private invalidateOld(count: number) {
		console.debug(`removing ${count} connections`)
		if (!count) return
		let keys = this.activeConnections.keys()
		let key = keys.next()
		for (let i = 0; i < count; key = keys.next()) {
			this.activeConnections.delete(key.value)
			console.debug(`removed ${key.value} connection`)
		}
	}

}
