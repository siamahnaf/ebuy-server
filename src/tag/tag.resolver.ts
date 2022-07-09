import { UseGuards } from "@nestjs/common";
import { Resolver, Mutation, Query, Args, ID } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

//Service
import { TagService } from "./tag.service";

//Dto
import { TagInput } from "./dto/tag.input";
import { UpdateTagInput } from "./dto/update.input";

//Entity
import { SuccessInfo } from "src/user/entities/sucess.entity";
import { Tag } from "./entities/tag.entity";

//Guards
import { Roles } from "src/auth/decorator/auth.decorator";
import { Role } from "src/auth/enum/auth.enum";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";


@Resolver()
export class TagResolver {
    //Constructor
    constructor(
        private readonly tagService: TagService
    ) { }

    //Get Tags
    @Query(() => [Tag], { name: "getTags" })
    getTags() {
        return this.tagService.getTags();
    }

    //Get Tag
    @Query(() => Tag, { name: "getTag" })
    getTag(
        @Args("id", { type: () => ID }) id: ObjectId
    ) {
        return this.tagService.getTag(id);
    }

    //Add Tag
    @Mutation(() => SuccessInfo, { name: "addTag" })
    @Roles(Role.ADMIN, Role.EDITOR)
    @UseGuards(AuthGuard, RolesGuard)
    addTag(
        @Args("tagInput") tagInput: TagInput
    ) {
        return this.tagService.addTag(tagInput);
    }

    //Update Tag
    @Mutation(() => SuccessInfo, { name: "updateTag" })
    @Roles(Role.ADMIN, Role.EDITOR)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("id", { type: () => ID }) id: ObjectId,
        @Args("updateTagInput") updateTagInput: UpdateTagInput
    ) {
        return this.tagService.update(id, updateTagInput);
    }

    //Delete Tag
    @Mutation(() => SuccessInfo, { name: "deleteTag" })
    @Roles(Role.ADMIN, Role.EDITOR)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id", { type: () => ID }) id: ObjectId
    ) {
        return this.tagService.delete(id);
    }
}