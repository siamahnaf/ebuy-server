import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

//Schema
import { Coupon, CouponDocument } from "./model/coupon.schema";


@Injectable()
export class CouponService {
    //Constructor
    constructor(
        @InjectModel(Coupon.name) private couponModel: Model<CouponDocument>
    ) { }

    //Get Coupon
    async getCoupon() {
        return "This is from Coupon"
    }
}