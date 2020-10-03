import Imap from "imap"
import {Service} from "typedi"
import {User} from "../model/user.model"
import {ImapSimple} from "imap-simple"

@Service()
export class BoxService {

	listBoxes(user: User, connection: ImapSimple): Promise<Imap.MailBoxes> {
		return connection.getBoxes()
	}

	/**
	 * - remove all properties except for `children`
	 * - replace null children mailboxes with empty maps
	 */
	formatMailboxes(mailBoxes: Imap.MailBoxes): Imap.MailBoxes {
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
						this.formatMailboxes(f.children)
					}
				})
		}
		return mailBoxes
	}

}
