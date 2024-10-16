// ProfileCanvas.tsx
import './profile-canvas.css';
import React from 'react';
import { StudentProfileForm } from './student-profile-form';
import { AcademicProfileForm } from './academic-profile-form';
import { ActivityFileForm } from './activity-profile-form';
import { HonorFileForm } from './honor-profile-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ProfileType } from '../../common';

export const ProfileCanvas: React.FC = () => {
    const activeProfile = useSelector((state: RootState) => state.selectedProfile.activeProfile);

    return (
        <div className="profile-background">
        {activeProfile === ProfileType.Student && <StudentProfileForm />}
        {activeProfile === ProfileType.Academic && <AcademicProfileForm />}
        {activeProfile === ProfileType.Activity && <ActivityFileForm />}
        {activeProfile === ProfileType.Honor && <HonorFileForm />}
        </div>
    );
};
