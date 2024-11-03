import Fuse from 'fuse.js';
import { locationMap } from '../location-map';
import { LocationURLCombined } from '../map-data-types';

// Configure Fuse.js with locationMap keys
const fuse = new Fuse(Array.from(locationMap.keys()), {
  threshold: 0.3, // Adjust for desired matching sensitivity
  includeScore: true,
});

// Utility function to get location for a given college name
export const getLocationForCollegeName = (collegeName: string): LocationURLCombined | undefined => {
  // Attempt exact match from locationMap
  const exactMatch = locationMap.get(collegeName);
  if (exactMatch) {
    return exactMatch;
  }

  // Use fuzzy search if no exact match found
  const result = fuse.search(collegeName);
  if (result.length > 0) {
    return locationMap.get(result[0].item);
  }

  // Return undefined if no match is found
  return undefined;
};

// Function to get location key (college name) for a given college name
export const getCollegeNameKey = (collegeName: string): string | undefined => {
    // Attempt exact match from locationMap
    if (locationMap.has(collegeName)) {
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