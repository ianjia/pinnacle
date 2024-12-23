import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
} from "@fluentui/react-components";
import { Trophy24Regular } from "@fluentui/react-icons";

import { RootState, AppDispatch, interviewConversationActions } from '../../store';
import { InterviewWorkshopType } from '../../shared';
import './interaction-interview.css';

export const InteractionInterviewPane: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const activeWorkshop = useSelector((state: RootState) => state.conversation.activeInterviewWorkshop);

    const handleProfileSelection = (workshop: InterviewWorkshopType) => {
        dispatch(interviewConversationActions.setActiveInterviewWorkshop(workshop));
    };

    const isActive = (workshop: InterviewWorkshopType) => activeWorkshop === workshop;

    return (
        <div className="interaction-college-list-pane">
            <Accordion>
                {/* College Preferences Section */}
                <AccordionItem value="preferences">
                    <AccordionHeader
                        className={`accordion-header ${isActive(InterviewWorkshopType.LiveInterview) ? 'active' : ''}`}
                        onClick={() => handleProfileSelection(InterviewWorkshopType.LiveInterview)}
                    >
                        <span className="accordion-icon"><Trophy24Regular /></span>
                        <span className="accordion-title">Conduct Interview</span>
                    </AccordionHeader>
                </AccordionItem>

                {/* Build List Section */}
                <AccordionItem value="build-list">
                    <AccordionHeader
                        className={`accordion-header ${isActive(InterviewWorkshopType.InterviewHistory) ? 'active' : ''}`}
                        onClick={() => handleProfileSelection(InterviewWorkshopType.InterviewHistory)}
                    >
                        <span className="accordion-icon"><Trophy24Regular /></span>
                        <span className="accordion-title">Interview History</span>
                    </AccordionHeader>
                </AccordionItem>
            </Accordion>
        </div>
    );
};