/*** interaction-college-list-pane.tsx ***/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  mergeClasses,
} from '@fluentui/react-components';
import {
  Settings24Regular,
  ClipboardBulletListLtrRegular,
  Map24Regular,
  DataBarHorizontal24Regular,
} from '@fluentui/react-icons';

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
    (state: RootState) => state.collegeListWorkshop.activeCollegeListWorkshop,
  );

  const handleSelect = (w: CollegeListWorkshopType) =>
    dispatch(collegeListWorkshopActions.setActiveCollegeListWorkshop(w));

  const isActive = (w: CollegeListWorkshopType) => activeWorkshop === w;

  return (
    <div className={styles.accordionContainerPane}>
      <Accordion>
        {/* College Preferences */}
        <AccordionItem value="preferences">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(CollegeListWorkshopType.Preferences) &&
                styles.accordionHeaderActive,
            )}
            onClick={() => handleSelect(CollegeListWorkshopType.Preferences)}
          >
            <span
              className={mergeClasses(
                styles.accordionIcon,
                isActive(CollegeListWorkshopType.Preferences) &&
                  styles.accordionIconActive,
              )}
            >
              <Settings24Regular />
            </span>
            <span
              className={mergeClasses(
                styles.accordionTitle,
                isActive(CollegeListWorkshopType.Preferences) &&
                  styles.accordionTitleActive,
              )}
            >
              College Preferences
            </span>
          </AccordionHeader>
        </AccordionItem>

        {/* Build College List */}
        <AccordionItem value="build-list">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(CollegeListWorkshopType.List) &&
                styles.accordionHeaderActive,
            )}
            onClick={() => handleSelect(CollegeListWorkshopType.List)}
          >
            <span
              className={mergeClasses(
                styles.accordionIcon,
                isActive(CollegeListWorkshopType.List) &&
                  styles.accordionIconActive,
              )}
            >
              <ClipboardBulletListLtrRegular />
            </span>
            <span
              className={mergeClasses(
                styles.accordionTitle,
                isActive(CollegeListWorkshopType.List) &&
                  styles.accordionTitleActive,
              )}
            >
              Build College List
            </span>
          </AccordionHeader>
        </AccordionItem>

        {/* College Navigation */}
        <AccordionItem value="navigation">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(CollegeListWorkshopType.Navigation) &&
                styles.accordionHeaderActive,
            )}
            onClick={() => handleSelect(CollegeListWorkshopType.Navigation)}
          >
            <span
              className={mergeClasses(
                styles.accordionIcon,
                isActive(CollegeListWorkshopType.Navigation) &&
                  styles.accordionIconActive,
              )}
            >
              <Map24Regular />
            </span>
            <span
              className={mergeClasses(
                styles.accordionTitle,
                isActive(CollegeListWorkshopType.Navigation) &&
                  styles.accordionTitleActive,
              )}
            >
              College Navigation
            </span>
          </AccordionHeader>
        </AccordionItem>

        {/* College Comparison */}
        <AccordionItem value="compare">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(CollegeListWorkshopType.Compare) &&
                styles.accordionHeaderActive,
            )}
            onClick={() => handleSelect(CollegeListWorkshopType.Compare)}
          >
            <span
              className={mergeClasses(
                styles.accordionIcon,
                isActive(CollegeListWorkshopType.Compare) &&
                  styles.accordionIconActive,
              )}
            >
              <DataBarHorizontal24Regular />
            </span>
            <span
              className={mergeClasses(
                styles.accordionTitle,
                isActive(CollegeListWorkshopType.Compare) &&
                  styles.accordionTitleActive,
              )}
            >
              College Comparison
            </span>
          </AccordionHeader>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
