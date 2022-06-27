import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class GoogleInput {
    @Field(() => String, { nullable: false })
    idToken: string;
}