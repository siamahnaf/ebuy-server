import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";

//Schema and Model
import { Category, CategoryDocument } from "./model/category.schema";
import { Subcategory, SubcategoryDocument } from "./model/sub-category.schema";

//Entites
import { SuccessInfo } from "src/user/entities/sucess.entity";

//Dto
import { CategoryInput } from "./dto/category.input";
import { SubcategoryInput } from "./dto/sub-category.input";
import { UpdateCateInput } from "./dto/update-category.input";
import { UpdateSubInput } from "./dto/update-sub.input";

@Injectable()
export class CategoryService {
    //Constructor
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
        @InjectModel(Subcategory.name) private subCategoryModel: Model<SubcategoryDocument>
    ) { }

    //Get all category service
    async categories() {
        const categories = await this.categoryModel.find();
        return categories;
    }

    //Get all subcategory service
    async subcategories() {
        const subcategories = await this.subCategoryModel.find();
        return subcategories;
    }

    //Subcategory batch service
    async SubcategoryBatch() {
        const category = await this.categoryModel.find
    }

    //Add category service
    async createCate(categoryInput: CategoryInput): Promise<SuccessInfo> {
        const category = await this.categoryModel.findOne({
            name: categoryInput.name
        });
        if (category) throw new NotFoundException("Category already added!");
        await this.categoryModel.create(categoryInput);
        return {
            success: true,
            message: "Category added successfully!"
        }
    }

    //Add sub category service
    async createSub(subCateInput: SubcategoryInput): Promise<SuccessInfo> {
        const sub = await this.subCategoryModel.findOne({
            name: subCateInput.name,
            category: subCateInput.category
        });
        if (sub) throw new NotFoundException("Category already added!")
        const result = await this.subCategoryModel.create(subCateInput);
        await this.categoryModel.findByIdAndUpdate(subCateInput.category, {
            $push: {
                subCategory: result._id
            }
        })
        return {
            success: true,
            message: "Category added successfully!"
        }
    }

    //Update category service
    async updateCate(updateCateInput: UpdateCateInput, id: ObjectId): Promise<SuccessInfo> {
        const category = await this.categoryModel.findOne({
            name: updateCateInput.name
        })
        if (category) throw new NotFoundException("Category name already in use!");
        const update = await this.categoryModel.findByIdAndUpdate(id, updateCateInput, { new: true });
        if (!update) throw new NotFoundException("Category not found!");
        return {
            success: true,
            message: "Category updated successfully!"
        }
    }

    //Update sub category service
    async updateSub(updateSubInput: UpdateSubInput, id: ObjectId): Promise<SuccessInfo> {
        const hasSub = await this.subCategoryModel.findOne({
            name: updateSubInput.name
        });
        if (hasSub) throw new NotFoundException("Sub-category already in use!");
        const subcategory = await this.subCategoryModel.findOne({
            _id: id
        });
        if (!subcategory) throw new NotFoundException("Sub-category not found!");
        await this.subCategoryModel.findByIdAndUpdate(id, updateSubInput, { new: true });
        if (updateSubInput.category) {
            await this.categoryModel.findByIdAndUpdate(subcategory.category, {
                $pull: {
                    subCategory: subcategory._id
                }
            })
            await this.categoryModel.findByIdAndUpdate(updateSubInput.category, {
                $push: {
                    subCategory: subcategory._id
                }
            })
        }
        return {
            success: true,
            message: "Sub-category updated successfully!"
        }
    }

    //Delete category service
    async deleteCate(id: ObjectId): Promise<SuccessInfo> {
        const result = await this.categoryModel.findByIdAndDelete(id);
        if (!result) throw new NotFoundException("Category not found!");
        await this.subCategoryModel.deleteMany({
            category: id
        });
        return {
            success: true,
            message: "Category deleted successfully!"
        }
    }

    //Delete sub category service
    async deleteSub(id: ObjectId): Promise<SuccessInfo> {
        const result = await this.subCategoryModel.findByIdAndDelete(id);
        if (!result) throw new NotFoundException("Sub category not found!");
        await this.categoryModel.findByIdAndUpdate(result.category, {
            $pull: {
                subCategory: id
            }
        });
        return {
            success: true,
            message: "Sub category deleted successfully!"
        }
    }
}