import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CollegeListWorkshopType } from '../../shared';
import { CollegeListNavigationForm } from './college-list-navigation-form';
import './college-list.css';
import { CollegePreferenceForm } from './college-preference/college-preference-form';
import { CollegeListBuildForm } from './college-list/college-list-build-form';

export const CollegeListCanvas: React.FC = () => {
    const activeWorkShop: CollegeListWorkshopType = useSelector((state: RootState) => state.collegeListWorkshop.activeCollegeListWorkshop);

    return (
        <div className="collegelist-background">
            {activeWorkShop === CollegeListWorkshopType.Preferences && <CollegePreferenceForm/>}
            {activeWorkShop === CollegeListWorkshopType.List && <CollegeListBuildForm/>}
            {activeWorkShop === CollegeListWorkshopType.Navigation && <CollegeListNavigationForm/>}
        </div>
    );
};

