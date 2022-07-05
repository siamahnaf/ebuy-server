import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

//Category Service and Resolver
import { CategoryService } from "./category.service";
import { CategoryResolver, SubCategoryResolver } from "./category.resolver";

//Schema
import { Category, CategorySchema } from "./model/category.schema";
import { Subcategory, SubcategorySchema } from "./model/sub-category.schema";

//User Modules
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Category.name,
                schema: CategorySchema
            },
            {
                name: Subcategory.name,
                schema: SubcategorySchema
            }
        ]),
        UserModule
    ],
    providers: [CategoryResolver, SubCategoryResolver, CategoryService],
    exports: [CategoryService]
})

export class CategoryModule { }

