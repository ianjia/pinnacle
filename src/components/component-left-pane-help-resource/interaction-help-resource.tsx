import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  mergeClasses,
} from '@fluentui/react-components';
import {
  QuestionCircle24Regular,
  DocumentText24Regular,
  ShieldCheckmark24Regular,
  Info24Regular,
} from '@fluentui/react-icons';

import {
  RootState,
  AppDispatch,
  helpResourceTermTabActions,
} from '../../store';
import { HelpResourceTermType } from '../../shared';
import { useAccordionStyles } from '../component-util';

export const InteractionHelpResourcePane: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const styles = useAccordionStyles();

  const activeTab = useSelector(
    (state: RootState) => state.helpResourceTerm.activeTab,
  );

  const handleSelect = (w: HelpResourceTermType) =>
    dispatch(helpResourceTermTabActions.setActiveTab(w));

  const isActive = (w: HelpResourceTermType) => activeTab === w;

  return (
    <div className={styles.accordionContainerPane}>
      <Accordion>
        {/* Help */}
        <AccordionItem value="help">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(HelpResourceTermType.Help) && styles.accordionHeaderActive,
            )}
            onClick={() => handleSelect(HelpResourceTermType.Help)}
          >
            <span
              className={mergeClasses(
                styles.accordionIcon,
                isActive(HelpResourceTermType.Help) && styles.accordionIconActive,
              )}
            >
              <QuestionCircle24Regular />
            </span>
            <span
              className={mergeClasses(
                styles.accordionTitle,
                isActive(HelpResourceTermType.Help) && styles.accordionTitleActive,
              )}
            >
              Help
            </span>
          </AccordionHeader>
        </AccordionItem>

        {/* Resource */}
        <AccordionItem value="resource">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(HelpResourceTermType.Resource) && styles.accordionHeaderActive,
            )}
            onClick={() => handleSelect(HelpResourceTermType.Resource)}
          >
            <span
              className={mergeClasses(
                styles.accordionIcon,
                isActive(HelpResourceTermType.Resource) &&
                  styles.accordionIconActive,
              )}
            >
              <DocumentText24Regular />
            </span>
            <span
              className={mergeClasses(
                styles.accordionTitle,
                isActive(HelpResourceTermType.Resource) &&
                  styles.accordionTitleActive,
              )}
            >
              Resource
            </span>
          </AccordionHeader>
        </AccordionItem>

        {/* Terms & Policies */}
        <AccordionItem value="terms">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(HelpResourceTermType.Terms) && styles.accordionHeaderActive,
            )}
            onClick={() => handleSelect(HelpResourceTermType.Terms)}
          >
            <span
              className={mergeClasses(
                styles.accordionIcon,
                isActive(HelpResourceTermType.Terms) && styles.accordionIconActive,
              )}
            >
              <ShieldCheckmark24Regular />
            </span>
            <span
              className={mergeClasses(
                styles.accordionTitle,
                isActive(HelpResourceTermType.Terms) &&
                  styles.accordionTitleActive,
              )}
            >
              Terms&nbsp;&amp;&nbsp;Policies
            </span>
          </AccordionHeader>
        </AccordionItem>

        {/* About */}
        <AccordionItem value="about">
          <AccordionHeader
            className={mergeClasses(
              styles.accordionHeader,
              isActive(HelpResourceTermType.About) && styles.accordionHeaderActive,
            )}
            onClick={() => handleSelect(HelpResourceTermType.About)}
          >
            <span
              className={mergeClasses(
                styles.accordionIcon,
                isActive(HelpResourceTermType.About) && styles.accordionIconActive,
              )}
            >
              <Info24Regular />
            </span>
            <span
              className={mergeClasses(
                styles.accordionTitle,
                isActive(HelpResourceTermType.About) && styles.accordionTitleActive,
              )}
            >
              About
            </span>
          </AccordionHeader>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
