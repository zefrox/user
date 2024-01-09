export interface ITokenLogin {
  _id: string
  name: string
  email: string
  roles: string[]
}

export interface ILogin {
  email: string
  password: string
}
