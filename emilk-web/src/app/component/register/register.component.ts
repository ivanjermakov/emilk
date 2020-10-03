import {Component, OnInit} from '@angular/core'
import {UserService} from "../../service/user.service"
import {Router} from "@angular/router"

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.sass', '../../style/auth.sass']
})
export class RegisterComponent implements OnInit {

	email: string
	password: string

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	ngOnInit(): void {
	}

	register() {
		this.userService.register({
			email: this.email,
			password: this.password
		}).subscribe(() => {
			this.router.navigate(['/log-in'])
		})
	}

}
