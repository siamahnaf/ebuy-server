import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";

//Schema
import { Color, ColorDocument } from "./model/color.schema";

//dto
import { ColorInput } from "./dto/color.input";
import { UpdateColorInput } from "./dto/update.input";

//Entities
import { SuccessInfo } from "src/user/entities/sucess.entity";


@Injectable()
export class ColorService {
    //Constructor
    constructor(
        @InjectModel(Color.name) private colorModel: Model<ColorDocument>
    ) { }

    //Get Colors
    async getColors() {
        const colors = await this.colorModel.find();
        return colors;
    }

    //Get color
    async getColor(id: ObjectId) {
        const color = await this.colorModel.findOne({
            _id: id
        });
        if (!color) throw new NotFoundException("Color not found!");
        return color;
    }

    //Add color
    async add(colorInput: ColorInput): Promise<SuccessInfo> {
        const color = await this.colorModel.findOne({
            name: colorInput.name
        });
        if (color) throw new NotFoundException("Color is already created!");
        await this.colorModel.create(colorInput);
        return {
            success: true,
            message: "Color created successfully!"
        }
    }

    //Update color
    async update(id: ObjectId, updateColorInput: UpdateColorInput): Promise<SuccessInfo> {
        const color = await this.colorModel.findOne({
            name: updateColorInput.name
        });
        if (color) throw new NotFoundException("Color already created!");
        const result = await this.colorModel.findByIdAndUpdate(id, updateColorInput, { new: true });
        if (!result) throw new NotFoundException("Color not found!");
        return {
            success: true,
            message: "Color updated successfully!"
        }
    }

    //Delete color
    async delete(id: ObjectId): Promise<SuccessInfo> {
        const result = await this.colorModel.findByIdAndDelete(id);
        if (!result) throw new NotFoundException("Color not found");
        return {
            success: true,
            message: "Color deleted successfully!"
        }
    }
}