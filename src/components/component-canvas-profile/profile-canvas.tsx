// ProfileCanvas.tsx
import './profile-canvas.css';
import React from 'react';
import { StudentProfileForm } from './student-profile-form';
import { AcademicProfileForm } from './academic-file-form';
import { ActivityFileForm } from './activity-file-form';
import { HonorFileForm } from './honor-file-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ProfileType } from '../../shared';
import { LifeAndGoalsForm } from './life_goal_form';

export const ProfileCanvas: React.FC = () => {
    const activeProfile = useSelector((state: RootState) => state.selectedProfile.activeProfile);

    return (
        <div className="profile-background">
        {activeProfile === ProfileType.Student && <StudentProfileForm />}
        {activeProfile === ProfileType.Academic && <AcademicProfileForm />}
        {activeProfile === ProfileType.Activity && <ActivityFileForm />}
        {activeProfile === ProfileType.Honor && <HonorFileForm />}
        {activeProfile === ProfileType.LifeGoals && <LifeAndGoalsForm/>}
        </div>
    );
};
