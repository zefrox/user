import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserController, UserDao, UserService, UserSchema } from './index'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserDao, UserService],
  exports: [UserService]
})
export class UserModule {}
