import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Types } from "mongoose";

//Date Scalar
import { DateScalar } from "src/date.scaler";

//Avatar
@ObjectType()
class Avatar {
    @Field(() => String, { nullable: true })
    url: string;
    @Field(() => String, { nullable: true })
    id: string;
}
//Provider
@ObjectType()
class Provider {
    @Field(() => String, { nullable: true })
    name: string;
    @Field(() => String, { nullable: true })
    id: string;
}
//Contact
@ObjectType()
class Contact {
    @Field(() => String, { nullable: true })
    address: string;
    @Field(() => String, { nullable: true })
    country: string;
    @Field(() => String, { nullable: true })
    city: string;
    @Field(() => String, { nullable: true })
    zip: string;
}
//User
@ObjectType()
export class User {
    @Field(() => ID, { nullable: false })
    id: Types.ObjectId;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: false })
    firstName: string;
    @Field(() => String, { nullable: false })
    lastName: string;
    @Field(() => String, { nullable: false })
    email: string;
    @Field(() => String, { nullable: true })
    phone: string;
    @Field(() => Avatar, { nullable: true })
    avatar: Avatar;
    @Field(() => Provider, { nullable: true })
    provider: Provider;
    @Field(() => Boolean, { nullable: true })
    verified: boolean;
    @Field(() => Contact, { nullable: true })
    contact: Contact;
    @Field(() => String, { nullable: false })
    role: string;
    @Field(() => Date, { nullable: true })
    createdAt: DateScalar;
    @Field(() => Date, { nullable: true })
    updatedAt: DateScalar;
}