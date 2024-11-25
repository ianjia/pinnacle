// ProfileNavPane.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './profile_nav.css';
import { selectedProfileActions, RootState, AppDispatch } from '../../store';
import { ProfileType } from '../../shared';

export const ProfileNavPane: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const activeProfile = useSelector((state: RootState) => state.selectedProfile.activeProfile);

    const handleProfileSelection = (profile: ProfileType) => {
        dispatch(selectedProfileActions.setSelectedProfile(profile));
    };

    const isActive = (profile: ProfileType) => activeProfile === profile;

    return (
        <div className="interaction-container">
            <h2 className="interaction-header">Profile</h2>
            <div className="interaction-header">
                <button
                    className={`review-button ${isActive(ProfileType.Student) ? 'active' : ''}`}
                    onClick={() => handleProfileSelection(ProfileType.Student)}
                >
                    Student Profile
                </button>
                <button
                    className={`review-button ${isActive(ProfileType.Academic) ? 'active' : ''}`}
                    onClick={() => handleProfileSelection(ProfileType.Academic)}
                >
                    Academic
                </button>
                <button
                    className={`review-button ${isActive(ProfileType.Activity) ? 'active' : ''}`}
                    onClick={() => handleProfileSelection(ProfileType.Activity)}
                >
                    Activity
                </button>
                <button
                    className={`review-button ${isActive(ProfileType.Honor) ? 'active' : ''}`}
                    onClick={() => handleProfileSelection(ProfileType.Honor)}
                >
                    Honor
                </button>
                <button
                    className={`review-button ${isActive(ProfileType.LifeGoals) ? 'active' : ''}`}
                    onClick={() => handleProfileSelection(ProfileType.LifeGoals)}
                >
                    Life and Goals
                </button>
            </div>
        </div>
    );
};


