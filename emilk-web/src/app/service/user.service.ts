import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {RegisterUser} from '../model/RegisterUser'
import {LogInUser} from '../model/LogInUser'
import {Token} from '../model/Token'
import {environment} from '../../environments/environment'
import {TokenProvider} from '../provider/token.provider'
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = `${environment.apiUrl}/user`

  constructor(
    private http: HttpClient,
    private tokenProvider: TokenProvider,
    private router: Router
  ) {}

  register(registerUserDto: RegisterUser): Observable<void> {
    return this.http.post<void>(`${this.url}/register`, registerUserDto)
  }

  logIn(logInUserDto: LogInUser): Observable<Token> {
    return this.http.post<Token>(`${this.url}/log-in`, logInUserDto)
  }

  logOut(): void {
    this.tokenProvider.setToken('')
    this.router.navigate(['/log-in'])
  }

}
