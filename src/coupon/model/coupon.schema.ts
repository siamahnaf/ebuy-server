import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CouponDocument = Coupon & Document;


@Schema({ timestamps: true })
export class Coupon {
    @Prop({ type: String, required: true })
    code: string;
    @Prop({ type: Number, required: true, max: 100 })
    discount: number;
    @Prop({ type: String, required: true, default: "%" })
    discountUnit: string;
    @Prop({ type: String })
    expireDate: string;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);