import Imap from "imap"

export interface FolderDto {
	children: MailboxesDto
}

export interface MailboxesDto {
	[name: string]: FolderDto
}

export const fromImapMailboxes = (mailBoxes: Imap.MailBoxes): MailboxesDto => {
	if (mailBoxes) {
		Object
			.keys(mailBoxes)
			.map(k => mailBoxes[k])
			.forEach(f => {
				delete (f as any).parent
				delete (f as any).attribs
				delete (f as any).delimiter
				delete (f as any).special_use_attrib
				if (!f.children) {
					f.children = {}
				} else {
					fromImapMailboxes(f.children)
				}
			})
	}
	return mailBoxes
}
