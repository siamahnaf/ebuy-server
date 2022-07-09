import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

// Service and Resolver
import { ColorService } from "./color.service";
import { ColorResolver } from "./color.resolver";

//Schema
import { Color, ColorSchema } from "./model/color.schema";

//Modules
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Color.name,
            schema: ColorSchema
        }]),
        UserModule
    ],
    providers: [ColorService, ColorResolver]
})

export class ColorModule { }