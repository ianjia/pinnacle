import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
} from "@fluentui/react-components";
import { Trophy24Regular } from "@fluentui/react-icons";

import { selectedProfileActions, RootState, AppDispatch } from '../../store';
import { ProfileType } from '../../shared';
import './profile-nav-pane.css';

export const ProfileNavPane: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const activeProfile = useSelector((state: RootState) => state.selectedProfile.activeProfile);
    const [activeSubItem, setActiveSubItem] = useState<string | null>(null);

    const handleProfileSelection = (profile: ProfileType) => {
        dispatch(selectedProfileActions.setSelectedProfile(profile));
    };

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setActiveSubItem(id); // Mark this sub-item as active
    };

    const isActive = (profile: ProfileType) => activeProfile === profile;

    return (
        <div className="profile-nav-pane">
            <Accordion>
                {/* Student Section */}
                <AccordionItem value="student">
                    <AccordionHeader
                        className={`accordion-header ${isActive(ProfileType.Student) ? 'active' : ''}`}
                        onClick={() => handleProfileSelection(ProfileType.Student)}
                    >
                        <span className="accordion-icon"><Trophy24Regular /></span>
                        <span className="accordion-title">Student Information</span>
                    </AccordionHeader>
                </AccordionItem>

                {/* Academics Section */}
                <AccordionItem value="academics">
                    <AccordionHeader
                        className={`accordion-header ${isActive(ProfileType.Academic) ? 'active' : ''}`}
                        onClick={() => handleProfileSelection(ProfileType.Academic)}
                    >
                        <span className="accordion-icon"><Trophy24Regular /></span>
                        <span className="accordion-title">School Academics</span>
                    </AccordionHeader>
                    <AccordionPanel>
                        <ul className="sub-item-list">
                            {[
                                { id: "standardized-tests", label: "SAT / ACT" },
                                { id: "gpa-section", label: "GPA" },
                                { id: "ninth-grade", label: "9th Grade" },
                                { id: "tenth-grade", label: "10th Grade" },
                                { id: "eleventh-grade", label: "11th Grade" },
                                { id: "twelfth-grade", label: "12th Grade" },
                            ].map(({ id, label }) => (
                                <li key={id}>
                                    <button
                                        className={`sub-item-button ${activeSubItem === id ? 'active' : ''}`}
                                        onClick={() => scrollToSection(id)}
                                    >
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </AccordionPanel>
                </AccordionItem>

                {/* Activities Section */}
                <AccordionItem value="activities">
                    <AccordionHeader
                        className={`accordion-header ${isActive(ProfileType.Activity) ? 'active' : ''}`}
                        onClick={() => handleProfileSelection(ProfileType.Activity)}
                    >
                        <span className="accordion-icon"><Trophy24Regular /></span>
                        <span className="accordion-title">Activities</span>
                    </AccordionHeader>
                </AccordionItem>

                {/* Honors Section */}
                <AccordionItem value="honors">
                    <AccordionHeader
                        className={`accordion-header ${isActive(ProfileType.Honor) ? 'active' : ''}`}
                        onClick={() => handleProfileSelection(ProfileType.Honor)}
                    >
                        <span className="accordion-icon"><Trophy24Regular /></span>
                        <span className="accordion-title">Honors & Awards</span>
                    </AccordionHeader>
                </AccordionItem>

                {/* Life & Goals Section */}
                <AccordionItem value="lifegoal">
                    <AccordionHeader
                        className={`accordion-header ${isActive(ProfileType.LifeGoals) ? 'active' : ''}`}
                        onClick={() => handleProfileSelection(ProfileType.LifeGoals)}
                    >
                        <span className="accordion-icon"><Trophy24Regular /></span>
                        <span className="accordion-title">Life & Goals</span>
                    </AccordionHeader>
                </AccordionItem>
            </Accordion>
        </div>
    );
};
