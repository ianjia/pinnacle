import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CollegeListWorkshopType } from '../../shared';
import { CollegeListNavigationForm } from './college-list-navigation-form';
import { CollegePreferenceForm } from './college-preference/college-preference-form';
import { CollegeListBuildMainContainer } from './college-list/college-list-build-main-container';
import { useCanvasBackgroundStyles } from '../component-util';

export const CollegeListCanvas: React.FC = () => {
    const activeWorkShop: CollegeListWorkshopType = useSelector((state: RootState) => state.collegeListWorkshop.activeCollegeListWorkshop);

    const styles = useCanvasBackgroundStyles();

    return (
        <div className = {styles.container}>
            {activeWorkShop === CollegeListWorkshopType.Preferences && <CollegePreferenceForm/>}
            {activeWorkShop === CollegeListWorkshopType.List && <CollegeListBuildMainContainer/>}
            {activeWorkShop === CollegeListWorkshopType.Navigation && <CollegeListNavigationForm/>}
        </div>
    );
};

