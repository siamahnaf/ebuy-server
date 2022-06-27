import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsEmail, IsString } from "class-validator";

@InputType()
export class LoginInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    password: string;
}