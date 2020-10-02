import 'reflect-metadata'
import {Action, createExpressServer, useContainer} from 'routing-controllers'
import {config} from "./config"
import mongoose from "mongoose"
import {Container} from "typedi"
import {UserRepository} from "./repository/user.repository"
import {UserService} from "./service/user.service"

useContainer(Container)

const connectDatabase = () => {
	if (!config.MONGODB_URI) throw new window.Error('no database URI provided.')
	mongoose
		.connect(config.MONGODB_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})
		.then(mongoose => console.info(`MongoDB connected on ${mongoose.connection.port}`))
		.catch(e => console.error(e))
}

connectDatabase()

createExpressServer({
	controllers: [`${__dirname}/controller/*.ts`],
	currentUserChecker: (action: Action) => {
		const token: string = action.request.headers['x-auth-token']
		return new UserService(new UserRepository()).tokenToUser(token)
	},
	cors: true
}).listen(3000)
