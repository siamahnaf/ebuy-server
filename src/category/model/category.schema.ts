import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

//Sub category schema
import { Subcategory } from "./sub-category.schema";

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category extends Document {
    @Prop({ type: String, required: true })
    name: string;
    @Prop({ type: String })
    description: string;
    @Prop({ type: [{ type: Types.ObjectId, ref: "Subcategory" }] })
    subCategory: Subcategory[]
}

export const CategorySchema = SchemaFactory.createForClass(Category);