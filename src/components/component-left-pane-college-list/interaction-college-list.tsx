
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { collegeListWorkshopActions, RootState, AppDispatch } from '../../store';
import { CollegeListWorkshopType } from '../../common';
import './interaction-college-list.css';

export const InteractionCollegeListPane: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const activeWorkshop = useSelector((state: RootState) => state.collegeListWorkshop.activeCollegeListWorkshop);

    const handleProfileSelection = (workshop: CollegeListWorkshopType) => {
        dispatch(collegeListWorkshopActions.setActiveCollegeListWorkshop(workshop));
    };

    const isActive = (workshop: CollegeListWorkshopType) => activeWorkshop === workshop;

    return (
        <div className="interaction-container">
            <h2 className="interaction-header">AI Powered College List Building</h2>
            <div className="interaction-header">
                <button
                    className={`review-button ${isActive(CollegeListWorkshopType.Preferences) ? 'active' : ''}`}
                    onClick={() => handleProfileSelection(CollegeListWorkshopType.Preferences)}
                >
                    College Preferences
                </button>
                <button
                    className={`review-button ${isActive(CollegeListWorkshopType.List) ? 'active' : ''}`}
                    onClick={() => handleProfileSelection(CollegeListWorkshopType.List)}
                >
                    Build List
                </button>
                <button
                    className={`review-button ${isActive(CollegeListWorkshopType.Navigation) ? 'active' : ''}`}
                    onClick={() => handleProfileSelection(CollegeListWorkshopType.Navigation)}
                >
                    Navigation College
                </button>
            </div>
        </div>
    );
};


