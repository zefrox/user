import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './index'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { ILogin } from 'src/common/dto/token.dto'

@Controller('auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login (
    @Res() response,
      @Body() body: ILogin): Promise<any> {
    const result = await this.authService.login(body)
    response.status(HttpStatus.OK).json(result)
  }
}
