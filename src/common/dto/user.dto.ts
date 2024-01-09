export class IBodyUserDTO {
  name: string
  email: string
  password: string
}
export class IBodyUpdateUserDTO {
  name: string
  id: string
}
export class IUserSaveDBDTO extends IBodyUserDTO {
  roles: string[]
  softDelete?: boolean
}

export class IUserResponseDBDTO extends IUserSaveDBDTO {
  _id: string
}
