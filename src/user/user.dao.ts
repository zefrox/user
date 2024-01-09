import { Injectable } from '@nestjs/common'
import { type IUser } from './interface/user.interface'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { type IUserSaveDBDTO } from 'src/common/dto/user.dto'

@Injectable()
export class UserDao {
  constructor (@InjectModel('User') private readonly userModel: Model<IUser>) { }

  async findUser (email: string): Promise<IUser | null> {
    const response = await this.userModel.findOne({ email })
    if (!response) {
      return null
    }
    return response
  }

  async create (data: IUserSaveDBDTO): Promise<IUser> {
    const result = new this.userModel(data)
    return await result.save()
  }

  async getAll (): Promise<IUser[] | null> {
    const response = await this.userModel.find()
    if (!response) {
      return null
    }
    return response
  }
}
