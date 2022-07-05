import { ObjectType, Field, HideField, ID } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

//Date Scalar
import { DateScalar } from "src/date.scaler";

@ObjectType()
export class Subcategory {
    @Field(() => ID, { nullable: false })
    id: ObjectId;
    @Field(() => String, { nullable: false })
    name: string;
    @HideField()
    category: ObjectId;
    @Field(() => Date, { nullable: false })
    createdAt: DateScalar;
    @Field(() => Date, { nullable: false })
    updatedAt: DateScalar;
}