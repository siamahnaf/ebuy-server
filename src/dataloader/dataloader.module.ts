import { Module } from "@nestjs/common";

//Dataloader Service
import { DataloaderService } from "./dataloader.service";

//Category Module
import { CategoryModule } from "src/category/category.module";

@Module({
    providers: [DataloaderService],
    imports: [CategoryModule],
    exports: [DataloaderService]
})
export class DataloaderModule { }