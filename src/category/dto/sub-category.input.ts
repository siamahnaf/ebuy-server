import { InputType, Field, ID } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

@InputType()
export class SubcategoryInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(() => ID, { nullable: false })
    @IsString()
    @IsNotEmpty()
    category: Types.ObjectId;
}