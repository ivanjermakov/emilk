import {Schema} from "mongoose"

export const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	hash: {
		type: String,
		required: true
	}
})

