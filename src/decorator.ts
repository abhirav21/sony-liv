import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Roles } from './dtos/role.enum';

export const Role: any = createParamDecorator(
  (data: string, ctx: ExecutionContext): ParameterDecorator => {
    const request = ctx.switchToHttp().getRequest();
    let role = request.headers?.role;
    if (!role) {
      role = Roles.Viewer;
    }
    console.debug('Role', role);
    return role;
  },
);
