import { GqlExecutionContext } from '@nestjs/graphql';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CustomRefreshTokenGuard extends AuthGuard('jwt-refresh') {
  getRequest(context: ExecutionContext) {
    const request = GqlExecutionContext.create(context).getContext();
    return request.req; //Graphql kullandığımız için, `jwt` isimli stratejinin gelen contexti anlayabilmesi için burada bir nevi TRANSLATION sağladık
  }
  // canActivate(context: ExecutionContext): boolean {
  //   const ctx = GqlExecutionContext.create(context);
  //   return true;
  // }
}
