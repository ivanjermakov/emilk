import {RegisterUserDto} from '../dto/register-user.dto'
import jwt, {verify} from 'jsonwebtoken'
import {UserRepository} from '../repository/user.repository'
import {compare, hash} from 'bcrypt'
import {LogInUserDto} from '../dto/log-in-user.dto'
import {Error} from '../error/error'
import {Service} from 'typedi'
import {config} from '../config'
import {TokenDto} from '../dto/token.dto'
import {User} from '../model/user.model'

@Service()
export class UserService {

    constructor(
        private userRepository: UserRepository
    ) {}

    register(registerUserDto: RegisterUserDto): Promise<void> {
        return this.userRepository
            .findByEmail(registerUserDto.email)
            .then(async user => {
                if (user) throw new Error(400, 'user with such email already exists')

                this.userRepository
                    .create({
                        email: registerUserDto.email,
                        hash: await hash(registerUserDto.password, 10)
                    })
                    .then()
            })
    }

    logIn(logInUserDto: LogInUserDto): Promise<TokenDto> {
        return this.userRepository
            .findByEmail(logInUserDto.email)
            .then(async user => {
                if (!user || !await compare(logInUserDto.password, user.hash))
                    throw new Error(401, 'wrong credentials')
                return user
            })
            .then(user =>
                this.generateToken(user.email)
            )
    }

    tokenToUser(token: string): Promise<User> {
        if (!token) throw new Error(401, 'no token provided')
        if (!config.JWT_SECRET) throw new Error(500, 'JWT_SECRET not provided')
        const email: string = (verify(token, config.JWT_SECRET) as any).email
        return new UserRepository().findByEmail(email)
    }

    private generateToken(email: string): TokenDto {
        if (!config.JWT_SECRET) throw new Error(500, 'JWT_SECRET not provided')
        return {
            value: jwt.sign(
                {email: email},
                config.JWT_SECRET
            )
        }
    }

}
