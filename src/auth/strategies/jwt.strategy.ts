import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { UserService } from './../../user/index'
import { type ITokenLogin } from 'src/common/dto/token.dto'
import { environments } from 'src/common/environments'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor (private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: environments.jwt.ignoreExpiration,
      secretOrKey: environments.jwt.secret
    })
  }

  async validate (validationPayload: { email: string }): Promise<ITokenLogin | null> {
    const user = await this.userService.findUser(validationPayload.email)
    if (!user) {
      return null
    }
    const { _id, name, email, roles } = user
    const response: ITokenLogin = {
      _id: _id.toString(),
      name,
      email,
      roles
    }
    return response
  }
}
