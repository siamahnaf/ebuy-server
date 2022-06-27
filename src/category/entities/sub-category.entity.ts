import { ObjectType, Field, ID } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
//Date Scalar
import { DateScalar } from "src/date.scaler";

//Category
import { Category } from "./category.entity";

@ObjectType()
export class Subcategory {
    @Field(() => ID, { nullable: false })
    id: ObjectId;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => Category, { nullable: false })
    category: Category;
    @Field(() => Date, { nullable: false })
    createdAt: DateScalar;
    @Field(() => Date, { nullable: false })
    updatedAt: DateScalar;
}