import DataLoader from 'dataloader';
import { ObjectId } from "mongoose";

//Schema Types
import { Category } from "src/category/model/category.schema";
import { Subcategory } from "src/category/model/sub-category.schema";

export interface IDataloaders {
    categoryLoader: DataLoader<ObjectId, Category>;
    subCategoryLoader: DataLoader<ObjectId, Subcategory>;
}