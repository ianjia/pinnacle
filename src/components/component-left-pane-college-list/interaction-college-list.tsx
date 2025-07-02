/*** interaction-college-list-pane.tsx ***/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  mergeClasses, // <-- import from @fluentui/react-components
} from '@fluentui/react-components';
import { Trophy24Regular } from '@fluentui/react-icons';

import {
  collegeListWorkshopActions,
  RootState,
  AppDispatch,
} from '../../store';
import { CollegeListWorkshopType } from '../../shared';
import { useAccordionStyles } from '../component-util';

export const InteractionCollegeListPane: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const styles = useAccordionStyles();

  const activeWorkshop = useSelector(
    (state: RootState) => state.collegeListWorkshop.activeCollegeListWorkshop
  );

  const handleProfileSelection = (workshop: CollegeListWorkshopType) => {
    dispatch(collegeListWorkshopActions.setActiveCollegeListWorkshop(workshop));
  };

  const isActive = (workshop: CollegeListWorkshopType) =>
    activeWorkshop === workshop;

  return (
    <div className={styles.accordionContainerPane}>
      <Accordion>
        {/* College Preferences Section */}
        <AccordionItem value="preferences">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(CollegeListWorkshopType.Preferences) &&
                styles.accordionHeaderActive
            )}
            onClick={() =>
              handleProfileSelection(CollegeListWorkshopType.Preferences)
            }
          >
            <span className={styles.accordionIcon}>
              <Trophy24Regular />
            </span>
            <span className={styles.accordionTitle}>College Preferences</span>
          </AccordionHeader>
        </AccordionItem>

        {/* Build List Section */}
        <AccordionItem value="build-list">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(CollegeListWorkshopType.List) && styles.accordionHeaderActive
            )}
            onClick={() => handleProfileSelection(CollegeListWorkshopType.List)}
          >
            <span className={styles.accordionIcon}>
              <Trophy24Regular />
            </span>
            <span className={styles.accordionTitle}>Build College List</span>
          </AccordionHeader>
        </AccordionItem>

        {/* Navigation College Section */}
        <AccordionItem value="navigation">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(CollegeListWorkshopType.Navigation) &&
                styles.accordionHeaderActive
            )}
            onClick={() =>
              handleProfileSelection(CollegeListWorkshopType.Navigation)
            }
          >
            <span className={styles.accordionIcon}>
              <Trophy24Regular />
            </span>
            <span className={styles.accordionTitle}>College Navigation</span>
          </AccordionHeader>
        </AccordionItem>

        {/* Navigation College Section */}
        <AccordionItem value="compare">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(CollegeListWorkshopType.Compare) &&
                styles.accordionHeaderActive
            )}
            onClick={() =>
              handleProfileSelection(CollegeListWorkshopType.Compare)
            }
          >
            <span className={styles.accordionIcon}>
              <Trophy24Regular />
            </span>
            <span className={styles.accordionTitle}>College Comparison</span>
          </AccordionHeader>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
