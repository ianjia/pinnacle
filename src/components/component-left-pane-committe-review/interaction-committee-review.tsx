import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  mergeClasses,
} from '@fluentui/react-components';
import {
  ClipboardCheckmark24Regular,  // Conduct review
  History24Regular,              // Review history
} from '@fluentui/react-icons';

import {
  RootState,
  AppDispatch,
  committeeReviewActions,
} from '../../store';
import { CommitteeReviewWorkshopType } from '../../shared';
import { useAccordionStyles } from '../component-util';

export const InteractionCommitteeReviewPane: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const styles = useAccordionStyles();

  const activeWorkshop = useSelector(
    (state: RootState) => state.committeeReview.activeCommitteeReviewWorkshop,
  );

  const handleSelect = (w: CommitteeReviewWorkshopType) =>
    dispatch(committeeReviewActions.setActiveCommitteeReviewWorkshop(w));

  const isActive = (w: CommitteeReviewWorkshopType) => activeWorkshop === w;

  return (
    <div className={styles.accordionContainerPane}>
      <Accordion>
        {/* Conduct holistic review */}
        <AccordionItem value="current-review">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(CommitteeReviewWorkshopType.CurrentReview) &&
                styles.accordionHeaderActive,
            )}
            onClick={() => handleSelect(CommitteeReviewWorkshopType.CurrentReview)}
          >
            <span
              className={mergeClasses(
                styles.accordionIcon,
                isActive(CommitteeReviewWorkshopType.CurrentReview) &&
                  styles.accordionIconActive,
              )}
            >
              <ClipboardCheckmark24Regular />
            </span>

            <span
              className={mergeClasses(
                styles.accordionTitle,
                isActive(CommitteeReviewWorkshopType.CurrentReview) &&
                  styles.accordionTitleActive,
              )}
            >
              Conduct Review
            </span>
          </AccordionHeader>
        </AccordionItem>

        {/* Holistic review history */}
        <AccordionItem value="review-history">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(CommitteeReviewWorkshopType.ReviewHistory) &&
                styles.accordionHeaderActive,
            )}
            onClick={() => handleSelect(CommitteeReviewWorkshopType.ReviewHistory)}
          >
            <span
              className={mergeClasses(
                styles.accordionIcon,
                isActive(CommitteeReviewWorkshopType.ReviewHistory) &&
                  styles.accordionIconActive,
              )}
            >
              <History24Regular />
            </span>

            <span
              className={mergeClasses(
                styles.accordionTitle,
                isActive(CommitteeReviewWorkshopType.ReviewHistory) &&
                  styles.accordionTitleActive,
              )}
            >
              Review History
            </span>
          </AccordionHeader>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
