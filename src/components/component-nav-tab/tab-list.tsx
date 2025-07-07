import React, { useContext, useState } from 'react';
import {
  HatGraduationRegular,
  PersonFeedbackRegular,
  ClipboardCheckmarkRegular,
  ComposeRegular,
  QuestionCircleRegular,
  WeatherMoonRegular,
  WeatherSunnyRegular,
} from '@fluentui/react-icons';
import {
  TabList,
  Tab,
  SelectTabData,
  SelectTabEvent,
  Button,
  Switch,                              // ← using Switch
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
import { AuthContext } from '../../auth/auth-context';
import { api } from '../../auth';
import { useTabListStyles } from './hooks/use-tab-list-styles';
import { AVATAR_KEYS, avatarSrc } from './avatar/avatars';

interface Props {
  toggleTheme: () => void;
}

export const LeftPaneTabList: React.FC<Props> = ({ toggleTheme }) => {
  const styles = useTabListStyles();

  /* ── redux + auth ─────────────────────────── */
  const dispatch      = useDispatch<AppDispatch>();
  const active        = useSelector((s: RootState) => s.navigationTab.activeTab);
  const email         = useSelector((s: RootState) => s.navigationTab.email);
  const profileImage  = useSelector((s: RootState) => s.navigationTab.profileImage);
  const { logout }    = useContext(AuthContext);

  /* ── tab select ───────────────────────────── */
  const onSelect = (_: SelectTabEvent, d: SelectTabData) =>
    dispatch(navigationTabActions.setActiveTab(d.value as NavTabType));

  /* ── avatar-picker dialog state ───────────── */
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pickMode,   setPickMode]   = useState(false);
  const [selected,   setSelected]   = useState(profileImage);

  const openDialog  = () => { setSelected(profileImage); setPickMode(false); setDialogOpen(true); };
  const closeDialog = () => setDialogOpen(false);

  const onDone = async () => {
    if (selected !== profileImage) {
      dispatch(navigationTabActions.setProfileImage(selected));
      await api.put('/api/v1/user/profile-picture', { profile_picture_url: selected });
    }
    closeDialog();
  };

  /* ── local state only for label/icon ──────── */
  const [dark, setDark] = useState(false);

  return (
    <aside className={styles.rail}>
      {/* ── tab list ───────────────────────────────────────── */}
      <TabList
        className={styles.tabList}
        vertical
        selectedValue={active}
        onTabSelect={onSelect}
      >
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

      {/* ── footer cluster ────────────────────────────────── */}
      <div className={styles.bottomArea}>
        {/* avatar trigger */}
        <Dialog modalType="modal" open={dialogOpen} onOpenChange={(_, d) => setDialogOpen(d.open)}>
          <DialogTrigger disableButtonEnhancement>
            <Button
              appearance="transparent"
              shape="circular"
              onClick={openDialog}
              className={styles.avatarBtn}
            >
              <Image
                src={avatarSrc(profileImage)}
                alt="avatar"
                style={{ borderRadius: '50%', width: 72, height: 72 }}
              />
            </Button>
          </DialogTrigger>

          <DialogSurface>
            <DialogBody>
              <DialogTitle>My profile</DialogTitle>
              <p>{email}</p>

              {!pickMode && (
                <Avatar size={96} image={{ src: avatarSrc(selected) }} style={{ margin: '0 auto' }} />
              )}

              {pickMode && (
                <div className={styles.grid}>
                  {AVATAR_KEYS.map(k => (
                    <Button
                      key={k}
                      shape="circular"
                      appearance={selected === k ? 'primary' : 'transparent'}
                      onClick={() => setSelected(k)}
                    >
                      <Image
                        src={avatarSrc(k)}
                        alt={k}
                        style={{ width: 56, height: 56, borderRadius: '50%' }}
                      />
                    </Button>
                  ))}
                </div>
              )}

              <DialogActions>
                <Button appearance="primary" onClick={() => setPickMode(!pickMode)}>
                  {pickMode ? 'Preview' : 'Change'}
                </Button>
                <Button appearance="primary" onClick={onDone}>Done</Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>

        {/* theme switch */}
        <Switch
          checked={dark}
          onChange={(_, data) => {
            setDark(data.checked);
            toggleTheme();
          }}
          label={
            <>
              {dark ? <WeatherMoonRegular /> : <WeatherSunnyRegular />}
              &nbsp;{dark ? 'Dark' : 'Light'}
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
