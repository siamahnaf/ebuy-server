import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsEmail } from "class-validator";

//Input types
@InputType()
export class VerifyInput {
    @Field(() => String, { nullable: false })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    otp: string;
}