import Imap from "imap"
import {Service} from "typedi"
import {User} from "../model/user.model"
import {BoxService} from "./box.service"
import {ImapSimple} from "imap-simple"

@Service()
export class ImapBoxService implements BoxService {

	listBoxes(user: User, connection: ImapSimple): Promise<Imap.MailBoxes> {
		return connection.getBoxes()
	}

}
