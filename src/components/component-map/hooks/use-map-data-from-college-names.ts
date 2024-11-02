import Fuse from 'fuse.js';
import { locationMap } from '../location-map';
import { CollegeNamePair, LocationURLCombined, MapDataType } from '../map-data-types';

// Configure Fuse.js with locationMap keys
const fuse = new Fuse(Array.from(locationMap.keys()), {
  threshold: 0.3, // Adjust for desired matching sensitivity
  includeScore: true,
});

export const useMapDataFromCollegeNames = (collegeNameList: CollegeNamePair[]): MapDataType[] => {
  return collegeNameList.map(({ collegeName, category }) => {
    // Use fuzzy search if there's no exact match in locationMap
    const match: LocationURLCombined | undefined = locationMap.get(collegeName) || (() => {
      const result = fuse.search(collegeName);
      return result.length > 0 ? locationMap.get(result[0].item) : undefined;
    })();

    return {
      collegeName,
      category,
      location: match,
    };
  });
};
