import { Resolver, Mutation, Query, Args, ID } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

//Service
import { BrandService } from "./brand.service";

//Dto
import { BrandInput } from "./dto/brand.input";
import { UpdateBrandInput } from "./dto/update.input";

//Entities
import { SuccessInfo } from "src/user/entities/sucess.entity";
import { Brand } from "./entities/brand.entity";


//Guards
import { Roles } from "src/auth/decorator/auth.decorator";
import { Role } from "src/auth/enum/auth.enum";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class BrandResolver {
    //Constructor
    constructor(
        private readonly brandService: BrandService
    ) { }

    //Get Brands
    @Query(() => [Brand], { name: "getBrands" })
    getBrand() {
        return this.brandService.getBrand();
    }

    //Get Single Brand
    @Query(() => Brand, { name: "getBrand" })
    getBrands(
        @Args("id", { type: () => ID }) id: ObjectId
    ) {
        return this.brandService.getBrands(id);
    }

    //Add brand
    @Mutation(() => SuccessInfo, { name: "addBrand" })
    @Roles(Role.EDITOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    add(
        @Args("brandInput") brandInput: BrandInput
    ) {
        return this.brandService.add(brandInput);
    }

    //Update brand
    @Mutation(() => SuccessInfo, { name: "updateBrand" })
    @Roles(Role.ADMIN, Role.EDITOR)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("id", { type: () => ID }) id: ObjectId,
        @Args("updateBrandInput") updateBrandInput: UpdateBrandInput
    ) {
        return this.brandService.update(id, updateBrandInput);
    }


    //Delete Brand
    @Mutation(() => SuccessInfo, { name: "deleteBrand" })
    @Roles(Role.EDITOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id", { type: () => ID }) id: ObjectId
    ) {
        return this.brandService.delete(id);
    }
}