import './profile-canvas.css';
import React from 'react';
import { StudentProfileForm } from './student-profile/student-profile-form';
import { HonorFileForm } from './honor-file-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ProfileType } from '../../shared';
import { LifeAndGoalsForm } from './life_goal_form';
import { AcademicsProfileForm } from './academics-profile/academics-profile-form';
import { ActivityProfileForm } from './activity-profile/activity-profile-form';

export const ProfileCanvas: React.FC = () => {
    const activeProfile = useSelector((state: RootState) => state.selectedProfile.activeProfile);

    return (
        <div className="profile-background">
        {activeProfile === ProfileType.Student && <StudentProfileForm />}
        {activeProfile === ProfileType.Academic && <AcademicsProfileForm />}
        {activeProfile === ProfileType.Activity && <ActivityProfileForm />}
        {activeProfile === ProfileType.Honor && <HonorFileForm />}
        {activeProfile === ProfileType.LifeGoals && <LifeAndGoalsForm/>}
        </div>
    );
};
