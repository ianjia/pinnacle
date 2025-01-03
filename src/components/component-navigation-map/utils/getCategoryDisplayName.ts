import { CollegeCategory } from "../../../shared";

export function getCategoryDisplayName(category: CollegeCategory) {
   if (category === 1) {
        return "Reach";
   } else if (category === 2) {
        return "Target";
   } else {
        return "Safe";
   }
}