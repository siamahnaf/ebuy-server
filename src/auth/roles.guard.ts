import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ROLES_KEY } from './decorator/auth.decorator';
import { Role } from './enum/auth.enum';

//Schema and Model
import { User, UserDocument } from "src/user/model/user.schema";


@Injectable()
export class RolesGuard implements CanActivate {
    //Constructor
    constructor(private reflector: Reflector) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getNext();
        return requiredRoles.some((role) => user.role?.includes(role));
    }
}