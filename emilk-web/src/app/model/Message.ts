export interface Message {
    uid: number
    from: string
    to: string[]
    date: Date
    subject: string
    body: string
}
