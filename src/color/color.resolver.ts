import { UseGuards } from "@nestjs/common";
import { Resolver, Mutation, Query, Args, ID } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

//Service
import { ColorService } from "./color.service";

//dto
import { ColorInput } from "./dto/color.input";
import { UpdateColorInput } from "./dto/update.input";

//Entities
import { SuccessInfo } from "src/user/entities/sucess.entity";
import { Color } from "./entities/color.entity";


//Guards
import { Roles } from "src/auth/decorator/auth.decorator";
import { Role } from "src/auth/enum/auth.enum";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";


@Resolver()
export class ColorResolver {
    //Constructor
    constructor(
        private readonly colorService: ColorService
    ) { }

    //Get Colors
    @Query(() => [Color], { name: "getColors" })
    getColors() {
        return this.colorService.getColors();
    }

    //Get Color
    @Query(() => Color, { name: "getColor" })
    getColor(
        @Args("id", { type: () => ID }) id: ObjectId
    ) {
        return this.colorService.getColor(id);
    }

    //Add Color
    @Mutation(() => SuccessInfo, { name: "addColor" })
    @Roles(Role.EDITOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    add(
        @Args("colorInput") colorInput: ColorInput
    ) {
        return this.colorService.add(colorInput);
    }

    //Update color
    @Mutation(() => SuccessInfo, { name: "updateColor" })
    @Roles(Role.EDITOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("id", { type: () => ID }) id: ObjectId,
        @Args("updateColorInput") updateColorInput: UpdateColorInput
    ) {
        return this.colorService.update(id, updateColorInput);
    }

    //Delete color
    @Mutation(() => SuccessInfo, { name: "deleteColor" })
    @Roles(Role.EDITOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id", { type: () => ID }) id: ObjectId
    ) {
        return this.colorService.delete(id);
    }
}