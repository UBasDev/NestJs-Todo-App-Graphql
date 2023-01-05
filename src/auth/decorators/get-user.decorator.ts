import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUserDecorator = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    let user;
    if (data === 'local') {
      user = GqlExecutionContext.create(context).getContext().user;
    } else {
      user = GqlExecutionContext.create(context).getContext().req.user;
    }
    //Contextin bir HTTP olduğunu belirttik ve bu HTTPnin requestini yakaladık
    return {
      id: user.id,
      username: user.username,
    };
    //Buradaki `sub` propertysi, JWT sign ederken içerisine bind ettiğimiz `sub` propertysidir
  },
);
