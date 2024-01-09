import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common'
import { IBodyUserDTO } from 'src/common/dto/user.dto'
import { UserService } from './user.service'
import { User } from 'src/auth/decorators/user.decorator'
import { ITokenLogin } from 'src/common/dto/token.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { RoleGuard } from 'src/auth/guards/roles.guard'
import { Roles } from 'src/auth/decorators/role.decorator'

@Controller('user/')
export class UserController {
  constructor (private readonly userService: UserService) { }

  @Post()
  async create (
    @Res() response,
      @Body() body: IBodyUserDTO): Promise<void> {
    const result = await this.userService.create(body)
    response.status(HttpStatus.OK).json(result)
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN', 'COMMON')
  @Get('/all')
  async getUsers (
    @Res() response,
      @User() user: ITokenLogin): Promise<void> {
    const result = await this.userService.getUsers()
    response.status(HttpStatus.OK).json(result)
  }
}
