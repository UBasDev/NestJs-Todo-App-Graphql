import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetHeaderRefreshTokenDecorator = createParamDecorator(
  (data: undefined, context: ExecutionContext) => {
    const req = GqlExecutionContext.create(context).getContext().req;
    //Contextin bir HTTP olduğunu belirttik ve bu HTTPnin requestini yakaladık
    return req.get('Authorization').replace('Bearer', '').trim();
    //Buradaki `sub` propertysi, JWT sign ederken içerisine bind ettiğimiz `sub` propertysidir
  },
);
