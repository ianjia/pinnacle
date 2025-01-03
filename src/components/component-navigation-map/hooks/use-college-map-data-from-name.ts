import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

import {
  BasicCollegeDataMapping,
  CollegeMapData,
  CollegeMarkerAdmissionData
} from '../data-types';
import { getBasicCollegeDataForCollege } from '../utils/get-basic-college-data-from-name';

export const useMapDataFromCollegeNames = (
  collegeNameList: string[]
): CollegeMapData[] => {
  
  const collegeList = useSelector(
    (state: RootState) => state.collegeListWorkshop.collegeList
  );

  // Temporarily store CollegeMapData or null
  const mapResults: Array<CollegeMapData | null> = collegeNameList.map((collegeName) => {
    // 1. Get the "basic data" for this college (i.e. location, url, resource).
    const basicData: BasicCollegeDataMapping | undefined =
      getBasicCollegeDataForCollege(collegeName);

    if (!basicData) {
      // If no basicData was found, skip this college by returning null.
      return null;
    }

    // 2. Search in the redux store's collegeList for the item whose college name matches
    const admissionData = collegeList.find(
      (item) =>
        item.college.trim().toLowerCase() ===
        collegeName.trim().toLowerCase()
    );

    // If we don't find anything in collegeList or there's no .data property, return just basic data.
    if (!admissionData || !admissionData.data) {
      return {
        ...basicData,
        collegeName,
      };
    }

    // 3. Extract the data fields from CombinedCollegeData (admissionData.data).
    const {
      admitRate,
      nationalRanking,
      programRanking,
      chance,
      category
    } = admissionData.data;

    // 4. Build the CollegeMarkerAdmissionData
    const markerAdmissionData: CollegeMarkerAdmissionData = {
      admitRate,
      nationalRanking,
      majorRanking: programRanking, // or rename if needed
      myChance: chance,
      category
    };

    // 5. Merge basicData (location/url) and markerAdmissionData into a single object
    return {
      ...basicData,
      collegeName,
      ...markerAdmissionData
    };
  });

  // Filter out any null values from mapResults to skip colleges without basicData
  const mapData: CollegeMapData[] = mapResults.filter(
    (entry): entry is CollegeMapData => entry !== null
  );

  return mapData;
};
