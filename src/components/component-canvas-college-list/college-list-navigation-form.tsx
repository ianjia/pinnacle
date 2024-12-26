import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Map } from '../component-map';
import { CollegeNamePair } from '../component-map';

export const CollegeListNavigationForm: React.FC = () => {
  const collegeList = useSelector((state: RootState) => state.collegeListWorkshop.collegeList);

  const collegeNameList: CollegeNamePair[] = collegeList.map((collegeData) => {
    return {
      collegeName: collegeData.college,
      // If collegeData.data is undefined, category becomes undefined
      category: collegeData.data?.category,
    };
  });

  return (
    <div>
      <Map collegeNameList={collegeNameList} />
    </div>
  );
};
