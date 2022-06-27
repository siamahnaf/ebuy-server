import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

//Category Schema
import { Category } from "./category.schema";

export type SubcategoryDocument = Subcategory & Document;

@Schema({ timestamps: true })
export class Subcategory extends Document {
    @Prop({ type: String, required: true })
    name: string;
    @Prop({ type: Types.ObjectId, ref: "Category", required: true })
    category: Category
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);