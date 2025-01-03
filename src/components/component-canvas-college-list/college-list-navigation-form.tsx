import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { NavigationMap } from '../component-navigation-map';

export const CollegeListNavigationForm: React.FC = () => {
  // Grab the entire array of CollegeAdmissionData from the redux store
  const collegeList = useSelector((state: RootState) => state.collegeListWorkshop.collegeList);

  // Convert the array of CollegeAdmissionData to an array of strings (the college names)
  const collegeNameList: string[] = collegeList.map((collegeData) => collegeData.college);

  return (
    <div>
      {/* Pass the string[] of college names to the NavigationMap component */}
      <NavigationMap collegeNameList={collegeNameList} />
    </div>
  );
};
