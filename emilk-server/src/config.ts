import dotenv from "dotenv"

dotenv.config()

interface Config {
	MONGODB_URI: string | undefined
	JWT_SECRET: string | undefined
}

export const config: Config = {
	MONGODB_URI: process.env.MONGODB_URI,
	JWT_SECRET: process.env.JWT_SECRET
}
