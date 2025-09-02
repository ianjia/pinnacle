import React, { useContext, useState } from 'react';
import {
  HatGraduationRegular,
  PersonFeedbackRegular,
  ClipboardCheckmarkRegular,
  ComposeRegular,
  QuestionCircleRegular,
  WeatherMoonRegular,
  WeatherSunnyRegular,
  PersonRegular,
} from '@fluentui/react-icons';
import {
  TabList,
  Tab,
  SelectTabData,
  SelectTabEvent,
  Button,
  Switch,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogActions,
  Avatar,
  Image,
} from '@fluentui/react-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch, navigationTabActions } from '../../store';
import { NavTabType } from '../../shared';
import { api } from '../../auth';
import { useTabListStyles } from './hooks/use-tab-list-styles';
import { AVATAR_KEYS, avatarSrc } from './avatar/avatars';
import { IThemeToggleProps } from '../component-util';
import { AuthContext } from '../../auth/auth-context';

export const LeftPaneTabList: React.FC<IThemeToggleProps> = ({
  toggleTheme,
  isDarkMode,
}) => {
  const styles = useTabListStyles();

  /* redux + auth */
  const dispatch = useDispatch<AppDispatch>();
  const active   = useSelector((s: RootState) => s.navigationTab.activeTab);
  const email    = useSelector((s: RootState) => s.navigationTab.email);
  const profile  = useSelector((s: RootState) => s.navigationTab.profileImage);
  const { logout } = useContext(AuthContext);

  const onSelect = (_: SelectTabEvent, d: SelectTabData) =>
    dispatch(navigationTabActions.setActiveTab(d.value as NavTabType));

  /* avatar dialog local state */
  const [open, setOpen] = useState(false);
  const [pick, setPick] = useState(false);
  const [sel,  setSel]  = useState(profile);

  /* avatar save */
  const saveAvatar = async () => {
    if (sel !== profile) {
      dispatch(navigationTabActions.setProfileImage(sel));
      await api.put('/api/v1/user/profile-picture', { profile_picture_url: sel });
    }
    setOpen(false);
  };

  return (
    <aside className={styles.rail}>
      {/* tabs */}
      <TabList
        className={styles.tabList}
        vertical
        selectedValue={active}
        onTabSelect={onSelect}
      >

        <Tab
          icon={<PersonRegular />} value={NavTabType.Profile}
        >
          <>Student<br /> Profile</>
        </Tab>
        <Tab icon={<HatGraduationRegular />} value={NavTabType.CollegeList}>
          <>College<br />Shortlist</>
        </Tab>
        <Tab icon={<PersonFeedbackRegular />} value={NavTabType.Interview}>
          <>Mock<br />Interview</>
        </Tab>
        <Tab icon={<ClipboardCheckmarkRegular />} value={NavTabType.ComitteReview}>
          <>Holistic<br />Review</>
        </Tab>
        <Tab icon={<ComposeRegular />} value={NavTabType.Essay}>
          <>Essay<br />Workshop</>
        </Tab>
        <Tab icon={<QuestionCircleRegular />} value={NavTabType.TermHelpResource}>
          <>Help&nbsp;/<br />Resource</>
        </Tab>
      </TabList>

      {/* footer */}
      <div className={styles.bottomArea}>
        {/* avatar */}
        <Dialog modalType="modal" open={open} onOpenChange={(_, d) => setOpen(d.open)}>
          <DialogTrigger disableButtonEnhancement>
            <Button
              appearance="transparent"
              shape="circular"
              onClick={() => { setSel(profile); setPick(false); setOpen(true); }}
              className={styles.avatarBtn}
            >
              <Image src={avatarSrc(profile)} alt="avatar" style={{ width: 72, height: 72, borderRadius: '50%' }} />
            </Button>
          </DialogTrigger>

          <DialogSurface>
            <DialogBody>
              <DialogTitle>My profile</DialogTitle>
              <p>{email}</p>

              {!pick && <Avatar size={96} image={{ src: avatarSrc(sel) }} style={{ margin: '0 auto' }} />}
              {pick && (
                <div className={styles.grid}>
                  {AVATAR_KEYS.map(k => (
                    <Button
                      key={k}
                      shape="circular"
                      appearance={sel === k ? 'primary' : 'transparent'}
                      onClick={() => setSel(k)}
                    >
                      <Image src={avatarSrc(k)} alt={k} style={{ width: 56, height: 56, borderRadius: '50%' }} />
                    </Button>
                  ))}
                </div>
              )}

              <DialogActions>
                <Button appearance="primary" onClick={() => setPick(!pick)}>
                  {pick ? 'Preview' : 'Change'}
                </Button>
                <Button appearance="primary" onClick={saveAvatar}>Done</Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>

        {/* theme switch (controlled) */}
        <Switch
          checked={isDarkMode}
          onChange={toggleTheme}
          label={
            <>
              {isDarkMode ? <WeatherMoonRegular /> : <WeatherSunnyRegular />}
              &nbsp;{isDarkMode ? 'Dark' : 'Light'}
            </>
          }
          labelPosition="after"
          className={styles.themeSwitch}
        />

        {/* logout */}
        <Button
          appearance="primary"
          size="medium"
          onClick={logout}
          className={styles.logoutButton}
        >
          Log Out
        </Button>
      </div>
    </aside>
  );
};
