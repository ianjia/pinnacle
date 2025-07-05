import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  mergeClasses,
} from '@fluentui/react-components';
import {
  Target24Regular,
  Compose24Regular,
  History24Regular,
} from '@fluentui/react-icons';

import { RootState, AppDispatch, essayWorkshopActions } from '../../store';
import { EssayWorkshopType } from '../../shared';
import { useAccordionStyles } from '../component-util';

export const EssayWorkshopPane: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const styles = useAccordionStyles();

  const activeWorkshop = useSelector(
    (state: RootState) => state.essayWorkshop.activeWorkshop,
  );
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);

  const handleSelect = (w: EssayWorkshopType) =>
    dispatch(essayWorkshopActions.setEssayWorkshop(w));

  const isActive = (w: EssayWorkshopType) => activeWorkshop === w;

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSubItem(id);
  };

  return (
    <div className={styles.accordionContainerPane}>
      <Accordion>

        {/* Life & Goals */}
        <AccordionItem value="life-goals">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(EssayWorkshopType.LifeGoals) && styles.accordionHeaderActive,
            )}
            onClick={() => handleSelect(EssayWorkshopType.LifeGoals)}
          >
            <span
              className={mergeClasses(
                styles.accordionIcon,
                isActive(EssayWorkshopType.LifeGoals) && styles.accordionIconActive,
              )}
            >
              <Target24Regular />
            </span>
            <span
              className={mergeClasses(
                styles.accordionTitle,
                isActive(EssayWorkshopType.LifeGoals) && styles.accordionTitleActive,
              )}
            >
              Life&nbsp;&amp;&nbsp;Goals
            </span>
          </AccordionHeader>
        </AccordionItem>

        {/* Essay Ideas & Draft */}
        <AccordionItem value="ideas-draft">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(EssayWorkshopType.IdeaAndDraft) && styles.accordionHeaderActive,
            )}
            onClick={() => handleSelect(EssayWorkshopType.IdeaAndDraft)}
          >
            <span
              className={mergeClasses(
                styles.accordionIcon,
                isActive(EssayWorkshopType.IdeaAndDraft) && styles.accordionIconActive,
              )}
            >
              <Compose24Regular />
            </span>
            <span
              className={mergeClasses(
                styles.accordionTitle,
                isActive(EssayWorkshopType.IdeaAndDraft) && styles.accordionTitleActive,
              )}
            >
              Essay Ideas&nbsp;&amp;&nbsp;Draft
            </span>
          </AccordionHeader>

          <AccordionPanel>
            <ul className={styles.subItemList}>
              {[
                { id: 'essay-prompt-card', label: 'Essay Prompt' },
                { id: 'essay-prompt-analysis', label: 'Prompt Analysis' },
                { id: 'essay-ideas-card', label: 'Essay Ideas' },
                { id: 'essay-draft-card', label: 'Essay Draft' },
              ].map(({ id, label }) => (
                <li key={id} className={styles.subItemListItem}>
                  <button
                    className={mergeClasses(
                      styles.subItemButton,
                      activeSubItem === id && styles.subItemButtonActive,
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

        {/* Essay History */}
        <AccordionItem value="history">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(EssayWorkshopType.History) && styles.accordionHeaderActive,
            )}
            onClick={() => handleSelect(EssayWorkshopType.History)}
          >
            <span
              className={mergeClasses(
                styles.accordionIcon,
                isActive(EssayWorkshopType.History) && styles.accordionIconActive,
              )}
            >
              <History24Regular />
            </span>
            <span
              className={mergeClasses(
                styles.accordionTitle,
                isActive(EssayWorkshopType.History) && styles.accordionTitleActive,
              )}
            >
              Essay History
            </span>
          </AccordionHeader>
        </AccordionItem>

      </Accordion>
    </div>
  );
};
