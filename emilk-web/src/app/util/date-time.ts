import {format} from 'date-fns'

export const formatDateTime = (date: Date): string => format(date, 'h:ma')
