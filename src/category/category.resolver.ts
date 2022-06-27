import { Resolver, ResolveField, Parent, Mutation, Query, Args, ID } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { ObjectId } from "mongoose";

//Service
import { CategoryService } from "./category.service";

//Dto
import { CategoryInput } from "./dto/category.input";
import { SubcategoryInput } from "./dto/sub-category.input";
import { UpdateCateInput } from "./dto/update-category.input";
import { UpdateSubInput } from "./dto/update-sub.input";

//Entites
import { SuccessInfo } from "src/user/entities/sucess.entity";
import { Category } from "./entities/category.entity";
import { Subcategory } from "./entities/sub-category.entity";

//Guards
import { Roles } from "src/auth/decorator/auth.decorator";
import { Role } from "src/auth/enum/auth.enum";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";

@Resolver(Category)
export class CategoryResolver {
    //Constructor
    constructor(private readonly categoryService: CategoryService) { }

    //Get All Category
    @Query(() => [Category], { name: "getCategories" })
    categories() {
        return this.categoryService.categories()
    }

    //Add Category
    @Mutation(() => SuccessInfo, { name: "addCategory" })
    @Roles(Role.EDITOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    addCate(
        @Args("categoryInput") categoryInput: CategoryInput
    ) {
        return this.categoryService.createCate(categoryInput);
    }

    //Update Category
    @Mutation(() => SuccessInfo, { name: "updateCategory" })
    @Roles(Role.EDITOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    updateCate(
        @Args("updateCateInput") updateCateInput: UpdateCateInput,
        @Args("id", { type: () => ID }) id: ObjectId
    ) {
        return this.categoryService.updateCate(updateCateInput, id)
    }

    //Delete Category
    @Mutation(() => SuccessInfo, { name: "deleteCategory" })
    @Roles(Role.EDITOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    deleteCate(
        @Args("id", { type: () => ID }) id: ObjectId
    ) {
        return this.categoryService.deleteCate(id)
    }

    //Resolver field for Category query
    @ResolveField('subCategory', () => [Subcategory])
    getSubCategory(
        @Parent() category: Category,
    ) {
        console.log(category);
    }
}

@Resolver(Subcategory)
export class SubCategoryResolver {
    //Constructor
    constructor(private readonly categoryService: CategoryService) { }

    //Get All subCategory
    @Query(() => [Subcategory], { name: "getSubCategories" })
    categories() {
        return this.categoryService.subcategories()
    }

    //Add Sub Category
    @Mutation(() => SuccessInfo, { name: "addSubCategory" })
    @Roles(Role.EDITOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    addSub(
        @Args("subCateInput") subCateInput: SubcategoryInput
    ) {
        return this.categoryService.createSub(subCateInput)
    }

    //Update Sub Category
    @Mutation(() => SuccessInfo, { name: "updateSubCategory" })
    @Roles(Role.EDITOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    updateSub(
        @Args("updateSubInput") updateSubInput: UpdateSubInput,
        @Args("id", { type: () => ID }) id: ObjectId
    ) {
        return this.categoryService.updateSub(updateSubInput, id);
    }

    //Delete Sub Category
    @Mutation(() => SuccessInfo, { name: "deleteSubCategory" })
    @Roles(Role.EDITOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    deleteSub(
        @Args("id", { type: () => ID }) id: ObjectId
    ) {
        return this.categoryService.deleteSub(id);
    }

    //Resolver field for sub category query
    @ResolveField('category', () => Category)
    getCategory(
        @Parent() subcategory: Subcategory,
    ) {
        console.log(subcategory);
    }
}