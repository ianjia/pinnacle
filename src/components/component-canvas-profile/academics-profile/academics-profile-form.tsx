import React from 'react';
import { useStyles } from './academics-profile-form.styles';
import { StandardizedTestCard } from './std-test-gpa/standardized-test-card';
import { GpaCard } from './std-test-gpa/gpa-card';
import { SchoolYear } from '../../../shared';
import { CouseApExamCombinedCard } from './course-ap-exam/course-ap-exam-combined-card';

export const AcademicsProfileForm: React.FC = () => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <div id="standardized-tests">
                <StandardizedTestCard />
            </div>
            <div id="gpa-section">
                <GpaCard />
            </div>
            <div id="ninth-grade">
                <CouseApExamCombinedCard school_year={SchoolYear.NINTH} />
            </div>
            <div id="tenth-grade">
                <CouseApExamCombinedCard school_year={SchoolYear.TENTH} />
            </div>
            <div id="eleventh-grade">
                <CouseApExamCombinedCard school_year={SchoolYear.ELEVENTH} />
            </div>
            <div id="twelfth-grade">
                <CouseApExamCombinedCard school_year={SchoolYear.TWELFTH} />
            </div>
        </div>
    );
};
