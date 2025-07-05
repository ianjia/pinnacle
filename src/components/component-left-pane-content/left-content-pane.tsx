import { NavTabType } from '../../shared';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { InteractionHelpResourcePane } from '../component-left-pane-help-resource';
import { InteractionCollegeListPane } from '../component-left-pane-college-list';
import { InteractionCommitteeReviewPane } from '../component-left-pane-committe-review';
import { ProfileNavPane } from '../component-left-pane-profile';
import { EssayWorkshopPane } from '../component-left-pane-essay';
import { InteractionInterviewPane } from '../component-left-pane-interview/interaction-interview';
import { useLeftContentPaneStyles } from './hooks/use-left-content-pane-styles';

export const LeftContentPane: React.FC = () => {
    const activeTab: NavTabType = useSelector((state: RootState) => state.navigationTab.activeTab);
    const styles   = useLeftContentPaneStyles();

    return (
        <div className={styles.container}>
          { activeTab === NavTabType.Profile && (<ProfileNavPane/>)}
          { activeTab === NavTabType.CollegeList && (<InteractionCollegeListPane/>)}
          { activeTab === NavTabType.ComitteReview && (<InteractionCommitteeReviewPane/>)}
          { activeTab === NavTabType.Interview && (<InteractionInterviewPane/>)}
          { activeTab === NavTabType.Essay && (<EssayWorkshopPane/>)}
          { activeTab === NavTabType.TermHelpResource && (<InteractionHelpResourcePane/>)}
        </div>
      );
}
