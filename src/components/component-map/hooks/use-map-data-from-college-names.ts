import { CollegeNamePair, MapDataType } from '../map-data-types';
import { getLocationForCollegeName } from '../utils/get-location-for-college-name';

export const useMapDataFromCollegeNames = (
  collegeNameList: CollegeNamePair[]
): MapDataType[] => {
  return collegeNameList.map(({ collegeName, category }) => {
    // Use the utility function to get the location
    const match = getLocationForCollegeName(collegeName);

    return {
      collegeName,
      category,
      location: match,
    };
  });
};
