import React from 'react';

import {
  HatGraduationRegular,
  PersonFeedbackRegular,
  ClipboardCheckmarkRegular,
  ComposeRegular,
  QuestionCircleRegular,
} from '@fluentui/react-icons';

import {
  TabList,
  Tab,
  SelectTabData,
  SelectTabEvent,
  Button,
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

export const LeftPaneTabList: React.FC = () => {
  const styles = useTabListStyles();

  /* ------------ Redux + Auth ------------ */
  const dispatch  = useDispatch<AppDispatch>();
  const active    = useSelector((s: RootState) => s.navigationTab.activeTab);
  const email     = useSelector((s: RootState) => s.navigationTab.email);
  const profileImage =
    useSelector((s: RootState) => s.navigationTab.profileImage);

  const { logout } = React.useContext(AuthContext);

  /* ------------ Tab change -------------- */
  const onSelect = (_ev: SelectTabEvent, data: SelectTabData) => {
    dispatch(navigationTabActions.setActiveTab(data.value as NavTabType));
  };

  /* ------------ Avatar dialog state ----- */
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [pickMode,   setPickMode]   = React.useState(false);
  const [selected,   setSelected]   = React.useState(profileImage);

  const openDialog  = () => {
    setSelected(profileImage);   // reset to current
    setPickMode(false);
    setDialogOpen(true);
  };
  const closeDialog = () => setDialogOpen(false);

  const onDone = async () => {
    if (selected === profileImage) {
      closeDialog();             // nothing changed – just close
      return;
    }
    /* persist change */
    dispatch(navigationTabActions.setProfileImage(selected));
    await api.put('/api/v1/user/profile-picture', {
      profile_picture_url: selected,
    });
    closeDialog();
  };

  /* ============================================================ */
  return (
    <aside className={styles.rail}>
      {/* ---------- top navigation --------- */}
      <TabList
        className={styles.tabList}
        selectedValue={active}
        onTabSelect={onSelect}
        vertical
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

      {/* ---------- footer cluster ---------- */}
      <div className={styles.bottomArea}>
        {/* avatar trigger + dialog */}
        <Dialog
          modalType="modal"
          open={dialogOpen}
          onOpenChange={(_, d) => setDialogOpen(d.open)}
        >
          <DialogTrigger disableButtonEnhancement>
            <Button
              appearance="transparent"
              shape="circular"
              className={styles.avatarBtn}
              onClick={openDialog}
            >
              <Image
                src={avatarSrc(profileImage)}
                alt="avatar button"
                style={{ borderRadius: '50%', width: 72, height: 72 }}
              />
            </Button>
          </DialogTrigger>

          <DialogSurface>
            <DialogBody>
              <DialogTitle>My profile</DialogTitle>
              <p>{email}</p>

              {!pickMode && (
                <Avatar
                  size={96}                           /* 30 % larger */
                  image={{ src: avatarSrc(selected) }}
                  style={{ margin: '0 auto' }}
                />
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
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                        }}
                      />
                    </Button>
                  ))}
                </div>
              )}

              <DialogActions>
                <Button
                  appearance="secondary"
                  onClick={() => setPickMode(!pickMode)}
                >
                  {pickMode ? 'Preview' : 'Change'}
                </Button>
                <Button onClick={onDone}>Done</Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>

        {/* logout */}
        <Button
          appearance="secondary"
          size="medium"
          onClick={logout}
          className={styles.logoutButton}
        >
          Log Out
        </Button>
      </div>
    </aside>
  );
};
