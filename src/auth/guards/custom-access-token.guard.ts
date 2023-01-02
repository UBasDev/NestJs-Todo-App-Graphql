import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CustomAccessTokenGuard extends AuthGuard('jwt-access') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req; //Graphql kullandığımız için, `jwt` isimli stratejinin gelen contexti anlayabilmesi için burada bir nevi TRANSLATION sağladık
  }
}
