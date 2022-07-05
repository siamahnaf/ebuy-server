import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmptyObject, IsString, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

//Input Sub Types
@InputType()
export class ContactInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    address: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    country: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    city: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    zip: string;
}

//Input Types
@InputType()
export class SignupInput {
    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    name: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    phone: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    password: string;

    @Field(() => ContactInput, { nullable: true })
    @IsNotEmptyObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => ContactInput)
    contact: ContactInput;
}