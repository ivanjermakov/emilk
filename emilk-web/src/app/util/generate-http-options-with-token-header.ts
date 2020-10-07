import {environment} from '../../environments/environment'

export const generateHttpOptionsWithTokenHeader = (token: string) => (
    {headers: {[environment.tokenHeaderName]: token}}
)
