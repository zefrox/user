import { ConflictException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { type IBodyUserDTO } from 'src/common/dto/user.dto'
import { UserDao } from './user.dao'
@Injectable()
export class UserService {
  constructor (private readonly userDataBase: UserDao
  ) { }

  async findUser (email: string): Promise<any> {
    const findedUser = await this.userDataBase.findUser(email)
    return findedUser
  }

  async create (data: IBodyUserDTO): Promise<boolean> {
    const isUserExist = await this.userDataBase.findUser(data.email)
    if (!isUserExist) throw new ConflictException('Email already in use')
    const userToSave = {
      ...data,
      password: await bcrypt.hash(data.password, 10),
      roles: ['COMMON']
    }
    const createdUser = await this.userDataBase.create(userToSave)
    if (createdUser) {
      return true
    } else {
      return false
    }
  }

  async getUsers (): Promise<any> {
    const findedUser = await this.userDataBase.getAll()
    return findedUser
  }
}
