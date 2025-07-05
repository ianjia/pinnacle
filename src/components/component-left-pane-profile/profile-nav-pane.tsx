import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  mergeClasses,
} from '@fluentui/react-components';
import { BookOpen24Regular, ContactCard24Regular, PeopleCommunity24Regular, Ribbon24Regular } from '@fluentui/react-icons';

import { selectedProfileActions, RootState, AppDispatch } from '../../store';
import { ProfileType } from '../../shared';
import { useAccordionStyles } from '../component-util';

export const ProfileNavPane: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const styles = useAccordionStyles();

  const activeProfile = useSelector(
    (state: RootState) => state.selectedProfile.activeProfile
  );
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
    <div className={styles.accordionContainerPane}>
      <Accordion>
        {/* Student Section */}
        <AccordionItem value="student">
        <AccordionHeader
          className={mergeClasses(
            styles.accordionHeader,
            isActive(ProfileType.Student) && styles.accordionHeaderActive   // icon + arrow tint
          )}
          onClick={() => handleProfileSelection(ProfileType.Student)}
        >
          <span
            className={mergeClasses(
              styles.accordionIcon,
              isActive(ProfileType.Student) && styles.accordionIconActive    // icon colour
            )}
          >
            <ContactCard24Regular />
          </span>

          {/* 🔹 apply bold class only when this item is active */}
          <span
            className={mergeClasses(
              styles.accordionTitle,
              isActive(ProfileType.Student) && styles.accordionTitleActive
            )}
          >
            Student Information
          </span>
        </AccordionHeader>

        </AccordionItem>

        {/* Academics Section */}
        <AccordionItem value="academics">
        <AccordionHeader
          className={mergeClasses(
            styles.accordionHeader,
            isActive(ProfileType.Academic) && styles.accordionHeaderActive   // icon + arrow tint
          )}
          onClick={() => handleProfileSelection(ProfileType.Academic)}
        >
          <span
            className={mergeClasses(
              styles.accordionIcon,
              isActive(ProfileType.Academic) && styles.accordionIconActive    // icon colour
            )}
          >
            <BookOpen24Regular />
          </span>

          {/* 🔹 apply bold class only when this item is active */}
          <span
            className={mergeClasses(
              styles.accordionTitle,
              isActive(ProfileType.Academic) && styles.accordionTitleActive
            )}
          >
            School Academics
          </span>
        </AccordionHeader>

          <AccordionPanel>
            <ul className={styles.subItemList}>
              {[
                { id: 'standardized-tests', label: 'SAT / ACT' },
                { id: 'gpa-section', label: 'GPA' },
                { id: 'ninth-grade', label: '9th Grade' },
                { id: 'tenth-grade', label: '10th Grade' },
                { id: 'eleventh-grade', label: '11th Grade' },
                { id: 'twelfth-grade', label: '12th Grade' },
              ].map(({ id, label }) => (
                <li key={id} className={styles.subItemListItem}>
                  <button
                    className={mergeClasses(
                      styles.subItemButton,
                      activeSubItem === id && styles.subItemButtonActive
                    )}
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
            className={mergeClasses(
              styles.accordionHeader,
              isActive(ProfileType.Activity) && styles.accordionHeaderActive   // icon + arrow tint
            )}
            onClick={() => handleProfileSelection(ProfileType.Activity)}
          >
            <span
              className={mergeClasses(
                styles.accordionIcon,
                isActive(ProfileType.Activity) && styles.accordionIconActive    // icon colour
              )}
            >
              <PeopleCommunity24Regular />
            </span>

            {/* 🔹 apply bold class only when this item is active */}
            <span
              className={mergeClasses(
                styles.accordionTitle,
                isActive(ProfileType.Activity) && styles.accordionTitleActive
              )}
            >
              Extracurricular Activities
            </span>
          </AccordionHeader>
        </AccordionItem>

        {/* Honors Section */}
        <AccordionItem value="honors">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(ProfileType.Honor) && styles.accordionHeaderActive   // icon + arrow tint
            )}
            onClick={() => handleProfileSelection(ProfileType.Honor)}
          >
            <span
              className={mergeClasses(
                styles.accordionIcon,
                isActive(ProfileType.Honor) && styles.accordionIconActive    // icon colour
              )}
            >
              <Ribbon24Regular />
            </span>

            {/* 🔹 apply bold class only when this item is active */}
            <span
              className={mergeClasses(
                styles.accordionTitle,
                isActive(ProfileType.Honor) && styles.accordionTitleActive
              )}
            >
              Honors / Awards
            </span>
          </AccordionHeader>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
