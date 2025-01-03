import { collegeMapping } from '../college-mapping';
import { fuse } from './fuzzy-config';

// Function to get location key (college name) for a given college name,
// if cannot one through exact match, will try fuzzy match
export const getCollegeNameKey = (collegeName: string): string | undefined => {
    // Attempt exact match from locationMap
    if (collegeMapping.has(collegeName)) {
      return collegeName;
    }
  
    // Use fuzzy search if no exact match found
    const result = fuse.search(collegeName);
    if (result.length > 0) {
      return result[0].item; // Return the matching key (college name)
    }
  
    // Return undefined if no match is found
    return undefined;
};