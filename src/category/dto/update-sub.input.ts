import { InputType, Field, ID } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { ObjectId } from "mongoose";

@InputType()
export class UpdateSubInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @Field(() => ID, { nullable: true })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    category: ObjectId;
}