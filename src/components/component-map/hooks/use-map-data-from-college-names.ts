import { locationMap } from "../location-map";
import { CollegeNamePair, MapDataType } from "../map-data-types";

export const useMapDataFromCollegeNames = (collegeNameList: CollegeNamePair[]): MapDataType[] => {
    return collegeNameList.map(({ collegeName, category }) => ({
      collegeName,
      category,
      location: locationMap.get(collegeName),
    }));
  };
  