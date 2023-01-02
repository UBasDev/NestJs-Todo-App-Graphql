import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUserDecorator = createParamDecorator(
  (data: undefined, context: ExecutionContext) => {
    const user = GqlExecutionContext.create(context).getContext().req.user;
    //Contextin bir HTTP olduğunu belirttik ve bu HTTPnin requestini yakaladık
    return {
      id: user.sub,
      username: user.username,
      refresh_token: user.refresh_token,
    };
    //Buradaki `sub` propertysi, JWT sign ederken içerisine bind ettiğimiz `sub` propertysidir
  },
);
