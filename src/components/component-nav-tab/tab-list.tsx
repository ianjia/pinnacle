import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { navigationTabActions } from '../../store';
import { NavTabType } from "../../shared";
import { NavigationTab } from './navigation-tab';

export const TabList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeTab = useSelector((state: RootState) => state.navigationTab.activeTab);

  const handleTabClick = (type: NavTabType) => {
    dispatch(navigationTabActions.setActiveTab(type));
  };

  return (
    <div className="tab-list">
      <NavigationTab
        title = 'Student Profile'
        isActive = {activeTab === NavTabType.Profile}
        onClick = {() => handleTabClick(NavTabType.Profile)}
      />      
      <NavigationTab
        title = 'College Explorer'
        isActive = {activeTab === NavTabType.CollegeNavigatoin}
        onClick = {() => handleTabClick(NavTabType.CollegeNavigatoin)}
      />
      <NavigationTab
        title = 'College Shortlist'
        isActive = {activeTab === NavTabType.CollegeList}
        onClick = {() => handleTabClick(NavTabType.CollegeList)}
      />
      <NavigationTab
        title = 'Mock Interview'
        isActive = {activeTab === NavTabType.Interview}
        onClick = {() => handleTabClick(NavTabType.Interview)}
      />
      <NavigationTab
        title = 'Holistic Review'
        isActive = {activeTab === NavTabType.ComitteReview}
        onClick = {() => handleTabClick(NavTabType.ComitteReview)}
      />
      <NavigationTab
        title = 'Essay Workshop'
        isActive = {activeTab === NavTabType.Essay}
        onClick = {() => handleTabClick(NavTabType.Essay)}
      />
    </div>
  );
};

