// import * as DataLoader from 'dataloader';
// import { ObjectId } from "mongoose";

// import { mapFromArray } from 'src/util';
// import { Subcategory } from '../entities/sub-category.entity';
// import { CategoryService } from '../category.service';

// export function createUsersLoader(categoryService: CategoryService) {
//     return new DataLoader<ObjectId, Subcategory[]>(async (ids) => {
//         const categories = await categoryService.subCategoryBatch(ids);

//         const categoryMap = mapFromArray(categories, (category) => category._id)

//         return ids.map((id) => categoryMap[2]);
//     });
// }
