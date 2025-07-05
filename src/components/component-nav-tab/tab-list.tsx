import {
  PersonRegular,
  HatGraduationRegular,
  PersonFeedbackRegular,
  ClipboardCheckmarkRegular,
  ComposeRegular,
  QuestionCircleRegular,
} from '@fluentui/react-icons';

import React from 'react';
import {
  TabList,
  Tab,
  SelectTabData,
  SelectTabEvent,
  Button,
} from '@fluentui/react-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch, navigationTabActions } from '../../store';
import { NavTabType } from '../../shared';
import { AuthContext } from '../../auth/auth-context';
import { useTabListStyles } from './hooks/use-tab-list-styles';

export const LeftPaneTabList: React.FC = () => {
  const styles = useTabListStyles();
  const dispatch = useDispatch<AppDispatch>();
  const active = useSelector(
    (state: RootState) => state.navigationTab.activeTab,
  );
  const { logout } = React.useContext(AuthContext);

  const onSelect = (_ev: SelectTabEvent, data: SelectTabData) => {
    dispatch(navigationTabActions.setActiveTab(data.value as NavTabType));
  };

  return (
    <aside className={styles.rail}>


      <TabList
        className={styles.tabList}
        selectedValue={active}
        onTabSelect={onSelect}
        vertical
      >
        <Tab
          icon={<PersonRegular />}
          value={NavTabType.Profile}
        >
          Student Profile
        </Tab>

        <Tab
          icon={<HatGraduationRegular />}
          value={NavTabType.CollegeList}
        >
          College Shortlist
        </Tab>

        <Tab
          icon={<PersonFeedbackRegular />}
          value={NavTabType.Interview}
        >
          Mock Interview
        </Tab>

        <Tab
          icon={<ClipboardCheckmarkRegular />}
          value={NavTabType.ComitteReview}
        >
          Holistic Review
        </Tab>

        <Tab
          icon={<ComposeRegular />}
          value={NavTabType.Essay}
        >
          Essay Workshop
        </Tab>

        <Tab
          icon={<QuestionCircleRegular />}
          value={NavTabType.TermHelpResource}
        >
          Help / Resource
        </Tab>
      </TabList>

      <Button
        appearance="secondary"
        size="medium"
        onClick={logout}
        className={styles.logoutButton}
      >
        Log Out
      </Button>
    </aside>
  );
};