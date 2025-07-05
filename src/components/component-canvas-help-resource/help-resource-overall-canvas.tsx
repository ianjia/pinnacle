import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { HelpResourceTermType } from '../../shared';
import { AboutCanvas } from './about-canvas';
import { HelpCanvas } from './help-canvas';
import { ResourceCanvas } from './resource-canvas';
import { TermsCanvas } from './terms-policy-canvas';

export const HelpResourceOverallCanvas: React.FC = () => {
    const activeWorkShop: HelpResourceTermType = useSelector((state: RootState) => state.helpResourceTerm.activeTab);
    return (
        <div>
            {activeWorkShop === HelpResourceTermType.About && <AboutCanvas/>}
            {activeWorkShop === HelpResourceTermType.Help && <HelpCanvas/>}
            {activeWorkShop === HelpResourceTermType.Resource && <ResourceCanvas/>}
            {activeWorkShop === HelpResourceTermType.Terms && <TermsCanvas/>}
        </div>
    );
};

