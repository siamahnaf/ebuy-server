import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class VerifyEmailInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    otp: string;
}