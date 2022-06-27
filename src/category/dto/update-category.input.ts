import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class UpdateCateInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description: string;
}