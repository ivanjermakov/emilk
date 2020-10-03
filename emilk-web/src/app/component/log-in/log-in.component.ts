import {Component, OnInit} from '@angular/core'
import {UserService} from "../../service/user.service"
import {TokenProvider} from "../../provider/token.provider"
import {Router} from "@angular/router"

@Component({
	selector: 'app-log-in',
	templateUrl: './log-in.component.html',
	styleUrls: ['./log-in.component.sass', '../../style/auth.sass']
})
export class LogInComponent implements OnInit {

	email: string
	password: string

	constructor(
		private userService: UserService,
		private tokenProvider: TokenProvider,
		private router: Router
	) {}

	ngOnInit(): void {}

	logIn() {
		this.userService
			.logIn({
				email: this.email,
				password: this.password
			})
			.subscribe(token => {
				this.tokenProvider.setToken(token.value)
				this.router.navigate(['/mail'])
			})
	}

}
