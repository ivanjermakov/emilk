import {Schema} from "mongoose"

export const ImapAccountSchema = new Schema({
	userEmail: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	config: {
		type: Object,
		required: true
	}
})

ImapAccountSchema.index({userEmail: 1, email: 1}, {unique: true})
