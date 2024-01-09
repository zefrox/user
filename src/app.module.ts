import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { environments } from './common/environments'
import { MongooseModule } from '@nestjs/mongoose'
@Module({
  imports: [
    MongooseModule.forRoot(environments.pathConnectionDB),
    UserModule,
    AuthModule],
  controllers: [],
  providers: []
})
export class AppModule {}
