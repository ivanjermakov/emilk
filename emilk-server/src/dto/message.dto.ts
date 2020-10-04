export interface MessageDto {
    uid: number
    from: string
    to: string[]
    date: Date
    subject: string
    body: string
}
