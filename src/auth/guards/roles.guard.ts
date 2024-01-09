import { type CanActivate, type ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor (private readonly _reflector: Reflector) {}

  canActivate (context: ExecutionContext): boolean {
    const roles: string[] = this._reflector.get<string[]>(
      'roles',
      context.getHandler()
    )

    if (!roles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const hasRole = () =>
      user.roles.some((role: string) => roles.includes(role))

    return user?.roles === true && hasRole()
  }
}
