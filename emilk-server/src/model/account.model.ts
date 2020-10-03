import {Document, model} from "mongoose"
import Connection from "imap"
import {AccountSchema} from "../schema/account.schema"

export interface Account {
	userEmail: string
	email: string
	config: Connection.Config
}

export interface AccountDocument extends Account, Document {}

export const AccountModel = model<AccountDocument>('imapAccount', AccountSchema)
