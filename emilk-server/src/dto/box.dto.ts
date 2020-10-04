import Imap from "imap"

export interface BoxMessagesDto {
	total: number
	new: number
	unseen: number
}

export interface BoxDto {
	name: string
	readonly?: boolean
	messages: BoxMessagesDto
}

export const fromImapBox = (box: Imap.Box): BoxDto => {
	return {
		name: box.name,
		readonly: box.readOnly,
		messages: box.messages
	}
}
