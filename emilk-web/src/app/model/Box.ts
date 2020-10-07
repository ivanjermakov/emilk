export interface BoxMessagesDto {
    total: number
    new: number
    unseen: number
}

export interface Box {
    name: string
    readonly?: boolean
    messages: BoxMessagesDto
}
