import {Document, model} from 'mongoose'
import {UserSchema} from '../schema/user.schema'

export interface User {
    email: string,
    hash: string
}

export interface UserDocument extends User, Document {}

export const UserModel = model<UserDocument>('user', UserSchema)
