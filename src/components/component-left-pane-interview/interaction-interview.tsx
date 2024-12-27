/*** interaction-interview-pane.tsx ***/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  mergeClasses, // <-- Import this for combining classes
} from '@fluentui/react-components';
import { Trophy24Regular } from '@fluentui/react-icons';

import { RootState, AppDispatch, interviewConversationActions } from '../../store';
import { InterviewWorkshopType } from '../../shared';
import { useAccordionStyles } from '../component-util';

export const InteractionInterviewPane: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const styles = useAccordionStyles();

  // Redux state
  const activeWorkshop = useSelector(
    (state: RootState) => state.conversation.activeInterviewWorkshop
  );

  // Handlers
  const handleProfileSelection = (workshop: InterviewWorkshopType) => {
    dispatch(interviewConversationActions.setActiveInterviewWorkshop(workshop));
  };

  const isActive = (workshop: InterviewWorkshopType) =>
    activeWorkshop === workshop;

  return (
    <div className={styles.accordionContainerPane}>
      <Accordion>
        {/* Live Interview Section */}
        <AccordionItem value="preferences">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(InterviewWorkshopType.LiveInterview) &&
                styles.accordionHeaderActive
            )}
            onClick={() => handleProfileSelection(InterviewWorkshopType.LiveInterview)}
          >
            <span className={styles.accordionIcon}>
              <Trophy24Regular />
            </span>
            <span className={styles.accordionTitle}>Conduct Interview</span>
          </AccordionHeader>
        </AccordionItem>

        {/* Interview History Section */}
        <AccordionItem value="build-list">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(InterviewWorkshopType.InterviewHistory) &&
                styles.accordionHeaderActive
            )}
            onClick={() =>
              handleProfileSelection(InterviewWorkshopType.InterviewHistory)
            }
          >
            <span className={styles.accordionIcon}>
              <Trophy24Regular />
            </span>
            <span className={styles.accordionTitle}>Interview History</span>
          </AccordionHeader>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
