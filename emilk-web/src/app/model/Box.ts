export interface BoxMessages {
    total: number
    new: number
    unseen: number
}

export interface Box {
    name: string
    readonly?: boolean
    messages: BoxMessages
}
