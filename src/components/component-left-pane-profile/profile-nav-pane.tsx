import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  mergeClasses, // <-- import from @fluentui/react-components
} from '@fluentui/react-components';
import { Trophy24Regular } from '@fluentui/react-icons';

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
              isActive(ProfileType.Student) && styles.accordionHeaderActive
            )}
            onClick={() => handleProfileSelection(ProfileType.Student)}
          >
            <span className={styles.accordionIcon}>
              <Trophy24Regular />
            </span>
            <span className={styles.accordionTitle}>Student Information</span>
          </AccordionHeader>
        </AccordionItem>

        {/* Academics Section */}
        <AccordionItem value="academics">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(ProfileType.Academic) && styles.accordionHeaderActive
            )}
            onClick={() => handleProfileSelection(ProfileType.Academic)}
          >
            <span className={styles.accordionIcon}>
              <Trophy24Regular />
            </span>
            <span className={styles.accordionTitle}>School Academics</span>
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
              isActive(ProfileType.Activity) && styles.accordionHeaderActive
            )}
            onClick={() => handleProfileSelection(ProfileType.Activity)}
          >
            <span className={styles.accordionIcon}>
              <Trophy24Regular />
            </span>
            <span className={styles.accordionTitle}>Activities</span>
          </AccordionHeader>
        </AccordionItem>

        {/* Honors Section */}
        <AccordionItem value="honors">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(ProfileType.Honor) && styles.accordionHeaderActive
            )}
            onClick={() => handleProfileSelection(ProfileType.Honor)}
          >
            <span className={styles.accordionIcon}>
              <Trophy24Regular />
            </span>
            <span className={styles.accordionTitle}>Honors & Awards</span>
          </AccordionHeader>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
