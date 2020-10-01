import 'reflect-metadata'
import {createExpressServer} from 'routing-controllers'

createExpressServer({
	controllers: [`${__dirname}/controller/*.ts`]
}).listen(3000)
