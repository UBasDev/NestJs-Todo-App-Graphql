import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUserIdDecorator = createParamDecorator(
  (data: undefined, context: ExecutionContext): number => {
    const user = GqlExecutionContext.create(context).getContext().req.user;
    //Contextin bir HTTP olduğunu belirttik ve bu HTTPnin requestini yakaladık
    return user.id;
    //Buradaki `sub` propertysi, JWT sign ederken içerisine bind ettiğimiz `sub` propertysidir
  },
);
