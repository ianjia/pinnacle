import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
} from "@fluentui/react-components";
import { Trophy24Regular } from "@fluentui/react-icons";

import { collegeListWorkshopActions, RootState, AppDispatch } from '../../store';
import { CollegeListWorkshopType } from '../../shared';
import './interaction-college-list.css';

export const InteractionCollegeListPane: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const activeWorkshop = useSelector((state: RootState) => state.collegeListWorkshop.activeCollegeListWorkshop);

    const handleProfileSelection = (workshop: CollegeListWorkshopType) => {
        dispatch(collegeListWorkshopActions.setActiveCollegeListWorkshop(workshop));
    };

    const isActive = (workshop: CollegeListWorkshopType) => activeWorkshop === workshop;

    return (
        <div className="interaction-college-list-pane">
            <Accordion>
                {/* College Preferences Section */}
                <AccordionItem value="preferences">
                    <AccordionHeader
                        className={`accordion-header ${isActive(CollegeListWorkshopType.Preferences) ? 'active' : ''}`}
                        onClick={() => handleProfileSelection(CollegeListWorkshopType.Preferences)}
                    >
                        <span className="accordion-icon"><Trophy24Regular /></span>
                        <span className="accordion-title">College Preferences</span>
                    </AccordionHeader>
                </AccordionItem>

                {/* Build List Section */}
                <AccordionItem value="build-list">
                    <AccordionHeader
                        className={`accordion-header ${isActive(CollegeListWorkshopType.List) ? 'active' : ''}`}
                        onClick={() => handleProfileSelection(CollegeListWorkshopType.List)}
                    >
                        <span className="accordion-icon"><Trophy24Regular /></span>
                        <span className="accordion-title">Build List</span>
                    </AccordionHeader>
                </AccordionItem>

                {/* Navigation College Section */}
                <AccordionItem value="navigation">
                    <AccordionHeader
                        className={`accordion-header ${isActive(CollegeListWorkshopType.Navigation) ? 'active' : ''}`}
                        onClick={() => handleProfileSelection(CollegeListWorkshopType.Navigation)}
                    >
                        <span className="accordion-icon"><Trophy24Regular /></span>
                        <span className="accordion-title">Navigation College</span>
                    </AccordionHeader>
                </AccordionItem>
            </Accordion>
        </div>
    );
};