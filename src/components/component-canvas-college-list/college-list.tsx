import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CollegeListWorkshopType } from '../../shared';
import { CollegeListRefineForm } from './college-list-refine-form';
import { CollegeListNavigationForm } from './college-list-navigation-form';
import { CollegePreferenceForm } from './college-preferences-form';
import './college-list.css';

export const CollegeListCanvas: React.FC = () => {
    const activeWorkShop: CollegeListWorkshopType = useSelector((state: RootState) => state.collegeListWorkshop.activeCollegeListWorkshop);

    return (
        <div className="essay-background">
            {activeWorkShop === CollegeListWorkshopType.Preferences && <CollegePreferenceForm/>}
            {activeWorkShop === CollegeListWorkshopType.List && <CollegeListRefineForm/>}
            {activeWorkShop === CollegeListWorkshopType.Navigation && <CollegeListNavigationForm/>}
        </div>
    );
};

