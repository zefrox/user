import { type ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getRequest (context: ExecutionContext) {
    return context.switchToHttp().getRequest()
  }
}
