import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ _id: false })
class Contact extends Document {
    @Prop({ type: String })
    address: string;
    @Prop({ type: String })
    country: string;
    @Prop({ type: String })
    city: string;
    @Prop({ type: String })
    zip: string;
}
const contactSchema = SchemaFactory.createForClass(Contact);

@Schema({ _id: false })
class Providers extends Document {
    @Prop({ type: String })
    name: string;
    @Prop({ type: String })
    id: string;
}
const providerSchema = SchemaFactory.createForClass(Providers);

@Schema({ _id: false })
class Avatar extends Document {
    @Prop({ type: String })
    url: string;
    @Prop({ type: String })
    id: string;
}
const avatarSchema = SchemaFactory.createForClass(Avatar);

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ type: String, required: true })
    name: string;
    @Prop({ type: String, required: true })
    firstName: string;
    @Prop({ type: String, required: true })
    lastName: string;
    @Prop({ type: String, required: true })
    email: string;
    @Prop({ type: String })
    phone: string;
    @Prop({ type: String, select: false })
    password: string;
    @Prop({ type: avatarSchema })
    avatar: Avatar;
    @Prop({ type: providerSchema })
    provider: Providers;
    @Prop({ type: Boolean, default: false })
    verified: boolean;
    @Prop({ type: String, select: false })
    otp: string;
    @Prop({ type: contactSchema })
    contact: Contact;
    @Prop({ type: String, enum: ["user", "seller", "editor", "admin"], default: 'user' })
    role: string;
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ createdAt: 1 }, {
    expireAfterSeconds: 300,
    partialFilterExpression: {
        verified: false
    }
});