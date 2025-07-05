import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  mergeClasses,
} from '@fluentui/react-components';
import {
  PersonFeedback24Regular,   // Conduct Interview
  History24Regular,          // Interview History
} from '@fluentui/react-icons';

import {
  RootState,
  AppDispatch,
  interviewConversationActions,
} from '../../store';
import { InterviewWorkshopType } from '../../shared';
import { useAccordionStyles } from '../component-util';

export const InteractionInterviewPane: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const styles = useAccordionStyles();

  // Redux state
  const activeWorkshop = useSelector(
    (state: RootState) => state.conversation.activeInterviewWorkshop,
  );

  const handleSelect = (w: InterviewWorkshopType) =>
    dispatch(interviewConversationActions.setActiveInterviewWorkshop(w));

  const isActive = (w: InterviewWorkshopType) => activeWorkshop === w;

  return (
    <div className={styles.accordionContainerPane}>
      <Accordion>
        {/* Conduct Interview */}
        <AccordionItem value="live">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(InterviewWorkshopType.LiveInterview) &&
                styles.accordionHeaderActive,
            )}
            onClick={() => handleSelect(InterviewWorkshopType.LiveInterview)}
          >
            <span
              className={mergeClasses(
                styles.accordionIcon,
                isActive(InterviewWorkshopType.LiveInterview) &&
                  styles.accordionIconActive,
              )}
            >
              <PersonFeedback24Regular />
            </span>

            <span
              className={mergeClasses(
                styles.accordionTitle,
                isActive(InterviewWorkshopType.LiveInterview) &&
                  styles.accordionTitleActive,
              )}
            >
              Conduct Interview
            </span>
          </AccordionHeader>
        </AccordionItem>

        {/* Interview History */}
        <AccordionItem value="history">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(InterviewWorkshopType.InterviewHistory) &&
                styles.accordionHeaderActive,
            )}
            onClick={() => handleSelect(InterviewWorkshopType.InterviewHistory)}
          >
            <span
              className={mergeClasses(
                styles.accordionIcon,
                isActive(InterviewWorkshopType.InterviewHistory) &&
                  styles.accordionIconActive,
              )}
            >
              <History24Regular />
            </span>

            <span
              className={mergeClasses(
                styles.accordionTitle,
                isActive(InterviewWorkshopType.InterviewHistory) &&
                  styles.accordionTitleActive,
              )}
            >
              Interview History
            </span>
          </AccordionHeader>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
