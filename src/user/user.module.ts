//Packages
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

//User Service and Resolver
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

//Schema
import { User, UserSchema } from "./model/user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }])
    ],
    providers: [UserResolver, UserService],
    exports: [MongooseModule]
})

export class UserModule { }