import { Injectable } from "@nestjs/common";
import DataLoader from "dataloader";
import { ObjectId } from "mongoose";

//Dataloader Interface
import { IDataloaders } from './dataloader.interface';

//Category Service
import { CategoryService } from "src/category/category.service";

//Schema
//-----Category Schema
import { Category } from "src/category/model/category.schema";
import { Subcategory } from "src/category/model/sub-category.schema";

@Injectable()
export class DataloaderService {
    constructor(private readonly categoryService: CategoryService) { }

    createLoaders(): IDataloaders {
        const categoryLoader = new DataLoader<ObjectId, Category>(
            async (keys: readonly ObjectId[]) =>
                this.categoryService.findCategoryByBatch(keys as ObjectId[])
        );
        const subCategoryLoader = new DataLoader<ObjectId, Subcategory>(
            async (keys: readonly ObjectId[]) =>
                this.categoryService.findSubCategoryByBatch(keys as ObjectId[])
        );
        return {
            categoryLoader,
            subCategoryLoader
        };
    }
}
