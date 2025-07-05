import React from 'react';
import { StudentProfileForm } from './student-profile/student-profile-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ProfileType } from '../../shared';
import { AcademicsProfileForm } from './academics-profile/academics-profile-form';
import { ActivityProfileForm } from './activity-profile/activity-profile-form';
import { HonorProfileForm } from './honor-profile/honor-profile-form';

export const ProfileCanvas: React.FC = () => {
    const activeProfile = useSelector((state: RootState) => state.selectedProfile.activeProfile);
    return (
        <div>
            {activeProfile === ProfileType.Student && <StudentProfileForm />}
            {activeProfile === ProfileType.Academic && <AcademicsProfileForm />}
            {activeProfile === ProfileType.Activity && <ActivityProfileForm />}
            {activeProfile === ProfileType.Honor && <HonorProfileForm />}
        </div>
    );
};
