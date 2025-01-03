import { BasicCollegeDataMapping } from "../data-types";
import { collegeMapping } from '../college-mapping';
import { fuse } from "./fuzzy-config";

export const getBasicCollegeDataForCollege = (collegeName: string): BasicCollegeDataMapping | undefined => {
  const exactMatch = collegeMapping.get(collegeName);
  if (exactMatch) {
    return exactMatch;
  }

  const result = fuse.search(collegeName);
  if (result.length > 0) {
    return collegeMapping.get(result[0].item);
  }

  return undefined;
};