import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  mergeClasses,
  AccordionPanel,
} from '@fluentui/react-components';
import { Trophy24Regular } from '@fluentui/react-icons';

import { RootState, AppDispatch, essayWorkshopActions } from '../../store';
import { EssayWorkshopType } from '../../shared';
import { useAccordionStyles } from '../component-util'; // This is your makeStyles import

export const EssayWorkshopPane: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const styles = useAccordionStyles();
  
    const activeWorkshop = useSelector(
      (state: RootState) => state.essayWorkshop.activeWorkshop
    );

    const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
  
    const handleProfileSelection = (workshop: EssayWorkshopType) => {
      dispatch(essayWorkshopActions.setEssayWorkshop(workshop));
    };
  
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setActiveSubItem(id); // Mark this sub-item as active
    };

    const isActive = (workshop: EssayWorkshopType) => activeWorkshop === workshop;
  
    return (
      <div className={styles.accordionContainerPane}>
        <Accordion>
          {/* Section 1 */}
          <AccordionItem value="preferences">
            <AccordionHeader
              className={mergeClasses(
                styles.accordionHeader,
                isActive(EssayWorkshopType.IdeaAndDraft) && styles.accordionHeaderActive
              )}
              onClick={() => handleProfileSelection(EssayWorkshopType.IdeaAndDraft)}
            >
              <span className={styles.accordionIcon}>
                <Trophy24Regular />
              </span>
              <span className={styles.accordionTitle}>Essay Ideas & Draft</span>
            </AccordionHeader>
        
            <AccordionPanel>
                <ul className={styles.subItemList}>
                {[
                    { id: 'essay-prompt-card', label: 'Essay Prompt' },
                    { id: 'essay-ideas-card', label: 'Essay Ideas' },
                    { id: 'essay-draft-card', label: 'Essay Draft' },
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
  
          {/* Section 2 */}
          <AccordionItem value="build-list">
            <AccordionHeader
              className={mergeClasses(
                styles.accordionHeader,
                isActive(EssayWorkshopType.History) && styles.accordionHeaderActive
              )}
              onClick={() => handleProfileSelection(EssayWorkshopType.History)}
            >
              <span className={styles.accordionIcon}>
                <Trophy24Regular />
              </span>
              <span className={styles.accordionTitle}>Essay History</span>
            </AccordionHeader>
          </AccordionItem>
        </Accordion>
      </div>
    );
  };