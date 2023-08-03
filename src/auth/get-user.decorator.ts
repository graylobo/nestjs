import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    console.log('데이터:', data);
    console.log('시티:', ctx);
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
