import { Resolver, Mutation, Query, Args, ID } from "@nestjs/graphql";

//Service
import { CouponService } from "./coupon.service";


@Resolver()
export class CouponResolver {
    //Constructor
    constructor(
        private readonly couponService: CouponService
    ) { }

    //Get Coupon
    @Query(() => String, { name: "getCoupon" })
    getCoupon() {
        return this.couponService.getCoupon();
    }
}