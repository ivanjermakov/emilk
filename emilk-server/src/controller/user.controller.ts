import {Body, JsonController, OnUndefined, Post} from "routing-controllers"
import {RegisterUserDto} from "../dto/register-user.dto"
import {LogInUserDto} from "../dto/log-in-user.dto"
import {UserService} from "../service/user.service"
import {TokenDto} from "../dto/token.dto"

@JsonController('/user')
export class UserController {

	constructor(
		private userService: UserService
	) {}

	@Post('/register')
	@OnUndefined(204)
	register(@Body() registerUserDto: RegisterUserDto): Promise<void> {
		return this.userService.register(registerUserDto)
	}

	@Post('/log-in')
	logIn(@Body() logInUserDto: LogInUserDto): Promise<TokenDto> {
		return this.userService.logIn(logInUserDto)
	}

}
