import dotenv from 'dotenv'

dotenv.config()

interface Config {
    MONGODB_URI: string | undefined
    JWT_SECRET: string | undefined
    CONNECTION_CACHE_SIZE: string | undefined
}

export const config: Config = {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    CONNECTION_CACHE_SIZE: process.env.CONNECTION_CACHE_SIZE
}
