import { useSelector } from 'react-redux';
import { NavTabType } from '../../shared';
import { RootState } from '../../store';
import { InterviewCanvas } from '../component-canvas-interview';
import { ProfileCanvas } from '../component-canvas-profile/profile-canvas';
import { EssayCanvas } from '../component-canvas-essay';
import { CollegeListCanvas } from '../component-canvas-college-list';
import { CommitteeReviewCanvas } from '../component-canvas-comittee/committee-review-canvas';
import { useCanvasBackgroundStyles } from './hooks/use-canvas-background-style';
import { HelpResourceOverallCanvas } from '../component-canvas-help-resource';

export const Canvas: React.FC = () => {
    const activeTab: NavTabType = useSelector((state: RootState) => state.navigationTab.activeTab);
    const styles = useCanvasBackgroundStyles();

    return (
        <div className={styles.container}>
            { activeTab === NavTabType.Profile && (<ProfileCanvas/>)}
            { activeTab === NavTabType.TermHelpResource && (<HelpResourceOverallCanvas/>)}
            { activeTab === NavTabType.CollegeList && (<CollegeListCanvas/>)}
            { activeTab === NavTabType.ComitteReview && (<CommitteeReviewCanvas/>)}
            { activeTab === NavTabType.Interview && (<InterviewCanvas/>)}
            { activeTab === NavTabType.Essay && (<EssayCanvas/>)}
        </div>
    )
}

