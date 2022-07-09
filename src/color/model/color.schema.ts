import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ColorDocument = Color & Document;

@Schema({ timestamps: true })
export class Color {
    @Prop({ type: String, required: true })
    name: string;
    @Prop({ type: String, required: true })
    code: string;
    @Prop({ type: String })
    description: string;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
