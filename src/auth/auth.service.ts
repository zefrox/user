import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { type ITokenLogin, type ILogin } from 'src/common/dto/token.dto'
import { UserService } from 'src/user'

@Injectable()
export class AuthService {
  constructor (
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async login (loginUserInput: ILogin): Promise<any> {
    const user = await this.userDataForToken(loginUserInput.email)
    if (!user) {
      throw new UnauthorizedException()
    }

    return {
      access_token: this.jwtService.sign({
        email: loginUserInput.email,
        sub: user._id
      }),
      email: loginUserInput.email,
      uid: user._id,
      name: user.name
    }
  }

  async userDataForToken (email: string): Promise<ITokenLogin> {
    const user = await this.userService.findUser(email)
    return this.extractDataUser(user)
  }

  async validateUser (email: string, password: string): Promise<ITokenLogin | null> {
    const user = await this.userService.findUser(email)
    const valid = await bcrypt.compare(password, user.password)
    if (user && valid) {
      return this.extractDataUser(user)
    }
    return null
  }

  extractDataUser (user: any): any {
    if (!user) return null
    const { _id, name, email, roles } = user
    return {
      _id,
      name,
      email,
      roles

    }
  }
}
