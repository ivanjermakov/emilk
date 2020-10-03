import {Document, model} from "mongoose"
import Connection from "imap"
import {ImapAccountSchema} from "../schema/imap-account.schema"

export interface ImapAccount {
	userEmail: string
	email: string
	config: Connection.Config
}

export interface ImapAccountDocument extends ImapAccount, Document {}

export const ImapAccountModel = model<ImapAccountDocument>('imapAccount', ImapAccountSchema)
