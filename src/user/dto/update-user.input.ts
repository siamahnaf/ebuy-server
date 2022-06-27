import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsOptional, IsNotEmpty, IsNotEmptyObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

//import input type
import { ContactInput } from "./signup.input";

//Avatar Input
@InputType()
export class AvatarInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    url: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    id: string;
}

//Input Types
@InputType()
export class UpdateUserInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    firstName: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    lastName: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    phone: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    password: string;

    @Field(() => ContactInput, { nullable: true })
    @IsNotEmptyObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => ContactInput)
    contact: ContactInput;

    @Field(() => AvatarInput, { nullable: true })
    @IsNotEmptyObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => AvatarInput)
    avatar: AvatarInput;
}