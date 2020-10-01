import {Get, JsonController, QueryParam} from 'routing-controllers'
import Imap from "imap"
import Connection from "imap"

@JsonController('/hello')
export class HelloController {

	@Get()
	hello(@QueryParam('user') user: string, @QueryParam('password') password: string): Promise<ReadableStream> {
		return new Promise<any>(resolve => {
			let connection: Connection = new Imap({
				user: user,
				password: password,
				host: 'imap.gmail.com',
				port: 993,
				tls: true,
				tlsOptions: {
					servername: 'imap.gmail.com'
				}
			})

			connection.connect()
			connection.once('ready', () => {
				connection.openBox('INBOX', true, (err, box) => {
					if (err) throw err
					const f = connection.seq.fetch('1', {bodies: '', struct: true})
					f.on('message', (msg, seqno) => {
						console.log('Message #%d', seqno)
						const prefix = '(#' + seqno + ') '
						msg.on('body', (stream, info) => {
							resolve(stream)
							console.log(info)
							let buffer = ''
							stream.on('data', chunk => {
								buffer += chunk.toString()
							})
							stream.once('end', () => {
								console.log(buffer)
							})
						})
						msg.once('end', () => {
							console.log(prefix + 'Finished')
						})
					})
					f.once('end', () => {
						console.log('Done fetching all messages!')
						connection.end()
					})
				})
			})
		})
	}

}
