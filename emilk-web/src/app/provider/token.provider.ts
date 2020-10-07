import {Injectable} from '@angular/core'
import {ObservableData} from '../util/observable-data'
import {TokenService} from '../service/token.service'

@Injectable({
  providedIn: 'root'
})
export class TokenProvider {

  token: ObservableData<string> = new ObservableData<string>()

  constructor(
      private tokenService: TokenService
  ) {
    this.token.set(this.tokenService.get() || '')
  }

  setToken(token: string): void {
    this.tokenService.set(token)
    this.token.set(token)
  }

}
