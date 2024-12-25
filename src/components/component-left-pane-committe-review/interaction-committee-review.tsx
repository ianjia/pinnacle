import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
} from "@fluentui/react-components";
import { Trophy24Regular } from "@fluentui/react-icons";

import { RootState, AppDispatch, committeeReviewActions } from '../../store';
import { CommitteeReviewWorkshopType } from '../../shared';
import './interaction-committee-review.css';

export const InteractionCommitteeReviewPane: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const activeWorkshop = useSelector((state: RootState) => state.committeeReview.activeCommitteeReviewWorkshop);

    const handleProfileSelection = (workshop: CommitteeReviewWorkshopType) => {
        dispatch(committeeReviewActions.setActiveCommitteeReviewWorkshop(workshop));
    };

    const isActive = (workshop: CommitteeReviewWorkshopType) => activeWorkshop === workshop;

    return (
        <div className="interaction-college-list-pane">
            <Accordion>
                {/* College Preferences Section */}
                <AccordionItem value="preferences">
                    <AccordionHeader
                        className={`accordion-header ${isActive(CommitteeReviewWorkshopType.CurrentReview) ? 'active' : ''}`}
                        onClick={() => handleProfileSelection(CommitteeReviewWorkshopType.CurrentReview)}
                    >
                        <span className="accordion-icon"><Trophy24Regular /></span>
                        <span className="accordion-title">Conduct Committee Review</span>
                    </AccordionHeader>
                </AccordionItem>

                {/* Build List Section */}
                <AccordionItem value="build-list">
                    <AccordionHeader
                        className={`accordion-header ${isActive(CommitteeReviewWorkshopType.ReviewHistory) ? 'active' : ''}`}
                        onClick={() => handleProfileSelection(CommitteeReviewWorkshopType.ReviewHistory)}
                    >
                        <span className="accordion-icon"><Trophy24Regular /></span>
                        <span className="accordion-title">Commitee Review History</span>
                    </AccordionHeader>
                </AccordionItem>
            </Accordion>
        </div>
    );
};