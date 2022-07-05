import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BrandDocument = Brand & Document;


@Schema({ timestamps: true })
export class Brand {
    @Prop({ type: String, required: true })
    name: string;
    @Prop({ type: String })
    description: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);