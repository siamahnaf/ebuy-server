import { ObjectType, Field } from "@nestjs/graphql";

//Date Scalar
import { DateScalar } from "src/date.scaler";

@ObjectType()
export class RegisterSuccess {
    @Field(() => Boolean, { nullable: false })
    success: boolean;
    @Field(() => String, { nullable: false })
    message: string;
    @Field(() => String, { nullable: false })
    token: string;
    @Field(() => Date, { nullable: false })
    expire: DateScalar;
}