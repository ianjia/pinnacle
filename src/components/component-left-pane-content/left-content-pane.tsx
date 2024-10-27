import './left-content-pane.css';
import { NavTabType } from '../../common';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { InteractionCollegeNav } from '../component-left-pane-college-nav';
import { InteractionCollegeListPane } from '../component-left-pane-college-list';
import { InteractionCommitteeReview } from '../component-left-pane-committe-review';
import { InteractionInterview } from '../component-interaction-interview';
import { ProfileNavPane } from '../component-left-pane-profile';
import { EssayWorkshopPane } from '../component-left-pane-essay';

export const LeftContentPane: React.FC = () => {
    const activeTab: NavTabType = useSelector((state: RootState) => state.navigationTab.activeTab);

    return (
        <div className="container">
          { activeTab === NavTabType.Profile && (<ProfileNavPane/>)}
           { activeTab === NavTabType.CollegeNavigatoin && (<InteractionCollegeNav/>)}
           { activeTab === NavTabType.CollegeList && (<InteractionCollegeListPane/>)}
           { activeTab === NavTabType.ComitteReview && (<InteractionCommitteeReview/>)}
           { activeTab === NavTabType.Interview && (<InteractionInterview/>)}
           { activeTab === NavTabType.Essay && (<EssayWorkshopPane/>)}
        </div>
      );
}
