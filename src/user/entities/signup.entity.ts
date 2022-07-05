import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class SignupInfo {
    @Field(() => Boolean, { nullable: false })
    success: boolean;
    @Field(() => String, { nullable: false })
    message: string;
    @Field(() => String, { nullable: false })
    email: string;
}