import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CollegeListWorkshopType } from '../../shared';
import { CollegeListNavigationForm } from './college-list-navigation-form';
import { CollegePreferenceForm } from './college-preference/college-preference-form';
import { CollegeListBuildMainContainer } from './college-list/college-list-build-main-container';
import './college-list.css';

export const CollegeListCanvas: React.FC = () => {
    const activeWorkShop: CollegeListWorkshopType = useSelector((state: RootState) => state.collegeListWorkshop.activeCollegeListWorkshop);

    return (
        <div className="collegelist-background">
            {activeWorkShop === CollegeListWorkshopType.Preferences && <CollegePreferenceForm/>}
            {activeWorkShop === CollegeListWorkshopType.List && <CollegeListBuildMainContainer/>}
            {activeWorkShop === CollegeListWorkshopType.Navigation && <CollegeListNavigationForm/>}
        </div>
    );
};

