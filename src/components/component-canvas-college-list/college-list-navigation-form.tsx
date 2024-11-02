// File 1: CollegeListNavigationForm
import React from 'react';
import { useSelector } from 'react-redux';
import { Map } from '../component-map';
import { RootState } from '../../store';
import { CollegeNamePair } from '../component-map'; // Ensure this type is correctly imported from your types file

export const CollegeListNavigationForm: React.FC = () => {
    // Get collegeList and collegeDetails from the Redux store
    const collegeList = useSelector((state: RootState) => state.collegeListWorkshop.collegeList);
    const collegeDetails = useSelector((state: RootState) => state.collegeListWorkshop.collegeDetails);

    // Build collegeNameList by combining college name and category from collegeDetails
    const collegeNameList: CollegeNamePair[] = collegeList.map(collegeName => {
        const details = collegeDetails[collegeName];
        return {
            collegeName,
            category: details ? details.category : 1, // Default category if details are missing
        };
    });

    return (
        <div>
            <Map collegeNameList={collegeNameList} />
        </div>
    );
};
