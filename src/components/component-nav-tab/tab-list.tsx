import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { navigationTabActions } from '../../store';
import { NavTabType } from '../../shared';
import { NavigationTab } from './navigation-tab';
import { AuthContext } from '../../auth/auth-context';

export const TabList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeTab = useSelector(
    (state: RootState) => state.navigationTab.activeTab
  );

  /* ── log-out comes from AuthContext ── */
  const { logout } = useContext(AuthContext);

  const handleTabClick = (type: NavTabType) => {
    dispatch(navigationTabActions.setActiveTab(type));
  };

  return (
    <div
      className="tab-list"
      style={{ display: 'flex', alignItems: 'center', gap: 8 }}
    >
      {/* ───────────────  Log-out button  ─────────────── */}
      <button
        onClick={logout}
        style={{
          marginTop: 22,
          marginBottom: 22,
          padding: '6px 12px',
          cursor: 'pointer',
          borderRadius: 4,
          border: '1px solid #ccc',
          background: '#fff',
          fontWeight: 500,
        }}
      >
        Log out
      </button>

      {/* ───────────────  Navigation tabs  ─────────────── */}
      <NavigationTab
        title="Student Profile"
        isActive={activeTab === NavTabType.Profile}
        onClick={() => handleTabClick(NavTabType.Profile)}
      />
      <NavigationTab
        title="College Shortlist"
        isActive={activeTab === NavTabType.CollegeList}
        onClick={() => handleTabClick(NavTabType.CollegeList)}
      />
      <NavigationTab
        title="Mock Interview"
        isActive={activeTab === NavTabType.Interview}
        onClick={() => handleTabClick(NavTabType.Interview)}
      />
      <NavigationTab
        title="Holistic Review"
        isActive={activeTab === NavTabType.ComitteReview}
        onClick={() => handleTabClick(NavTabType.ComitteReview)}
      />
      <NavigationTab
        title="Essay Workshop"
        isActive={activeTab === NavTabType.Essay}
        onClick={() => handleTabClick(NavTabType.Essay)}
      />
      <NavigationTab
        title="Term, Help & Resource"
        isActive={activeTab === NavTabType.TermHelpResource}
        onClick={() => handleTabClick(NavTabType.TermHelpResource)}
      />
    </div>
  );
};
