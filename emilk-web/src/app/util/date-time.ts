import {format} from 'date-fns'

export const formatDateTime = (date: Date): string => format(date, 'LLL d, h:ma')
