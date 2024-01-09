import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from 'src/user/user.module'
import { PassportModule } from '@nestjs/passport'
import { environments } from 'src/common/environments'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [UserModule,
    PassportModule.register({
      defaultStrategy: environments.jwt.defaultStrategy
    }),
    JwtModule.register({
      secret: environments.jwt.secret,
      signOptions: { expiresIn: environments.jwt.expired }
    })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
