import {Schema} from 'mongoose'

export const AccountSchema = new Schema({
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

AccountSchema.index({userEmail: 1, email: 1}, {unique: true})
