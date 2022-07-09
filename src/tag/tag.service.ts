import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";

//Schema
import { Tag, TagDocument } from "./model/tag.schema";

//Dto
import { TagInput } from "./dto/tag.input";
import { UpdateTagInput } from "./dto/update.input";

//Entity
import { SuccessInfo } from "src/user/entities/sucess.entity";

@Injectable()
export class TagService {
    //Constructor
    constructor(
        @InjectModel(Tag.name) private tagModel: Model<TagDocument>
    ) { }

    //Get tags
    async getTags() {
        const tags = await this.tagModel.find();
        return tags;
    }

    //Get Tag
    async getTag(id: ObjectId) {
        const tag = await this.tagModel.findOne({
            _id: id
        });
        if (!tag) throw new NotFoundException("Tag is not found!");
        return tag;
    }

    //Add tags
    async addTag(tagInput: TagInput): Promise<SuccessInfo> {
        const tag = await this.tagModel.findOne({
            name: tagInput.name
        });
        if (tag) throw new NotFoundException("Tag already created!");
        await this.tagModel.create(tagInput);
        return {
            success: true,
            message: "Tag created successfully!"
        }
    }

    //Update tags
    async update(id: ObjectId, updateTagInput: UpdateTagInput): Promise<SuccessInfo> {
        const tag = await this.tagModel.findOne({
            name: updateTagInput.name
        });
        if (tag) throw new NotFoundException("Tag already listed!")
        const result = await this.tagModel.findByIdAndUpdate(id, updateTagInput, { new: true });
        if (!result) throw new NotFoundException("Tag not found!");
        return {
            success: true,
            message: "Tag is updated successfully!"
        }
    }

    //Delete Tag
    async delete(id: ObjectId): Promise<SuccessInfo> {
        const result = await this.tagModel.findByIdAndDelete(id);
        if (!result) throw new NotFoundException("Tag not found");
        return {
            success: true,
            message: "Tag deleted successfully!"
        }
    }
}