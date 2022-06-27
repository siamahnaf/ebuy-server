import { ObjectType, Field, ID } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
//Date Scalar
import { DateScalar } from "src/date.scaler";

//Sub Category
import { Subcategory } from "./sub-category.entity";

@ObjectType()
export class Category {
    @Field(() => ID, { nullable: false })
    id: ObjectId;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: true })
    description: string;
    @Field(() => [Subcategory], { nullable: true })
    subCategory: Subcategory[];
    @Field(() => Date, { nullable: false })
    createdAt: DateScalar;
    @Field(() => Date, { nullable: false })
    updatedAt: DateScalar;
}