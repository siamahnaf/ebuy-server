import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";

//Schema 
import { Brand, BrandDocument } from "./model/brand.schema";

//Dto
import { BrandInput } from "./dto/brand.input";
import { UpdateBrandInput } from "./dto/update.input";

//Entities
import { SuccessInfo } from "src/user/entities/sucess.entity";

@Injectable()
export class BrandService {
    //Constructor
    constructor(
        @InjectModel(Brand.name) private brandModel: Model<BrandDocument>
    ) { }

    //Get Brand
    async getBrand() {
        const brands = await this.brandModel.find();
        return brands;
    }

    //Get Single Brands
    async getBrands(id: ObjectId) {
        const brand = await this.brandModel.findOne({
            _id: id
        });
        if (!brand) throw new NotFoundException("Brand not found!");
        return brand;
    }

    //Add Brand
    async add(brandInput: BrandInput): Promise<SuccessInfo> {
        const brand = await this.brandModel.findOne({
            name: brandInput.name
        });
        if (brand) throw new NotFoundException("Brand is already created!");
        await this.brandModel.create(brandInput);
        return {
            success: true,
            message: "Brand created successfully!"
        }
    }

    //Update Brand
    async update(id: Object, updateBrandInput: UpdateBrandInput): Promise<SuccessInfo> {
        const brand = await this.brandModel.findOne({
            name: updateBrandInput.name
        });
        if (brand) throw new NotFoundException("Brand is already listed")
        const result = await this.brandModel.findByIdAndUpdate(id, updateBrandInput, { new: true });
        if (!result) throw new NotFoundException("Brand not found!");
        return {
            success: true,
            message: "Brand updated successfully!"
        }
    }

    //Delete Brand
    async delete(id: ObjectId): Promise<SuccessInfo> {
        const result = await this.brandModel.findByIdAndDelete(id);
        if (!result) throw new NotFoundException("Brand not found!");
        return {
            success: true,
            message: "Brand deleted successfully!"
        }
    }
}