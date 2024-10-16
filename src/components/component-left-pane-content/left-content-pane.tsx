import './left-content-pane.css';
import { NavTabType } from '../../common';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { InteractionCollegeNav } from '../component-interaction-college-nav';
import { InteractionCollegeList } from '../component-interaction-college-list';
import { InteractionCommitteeReview } from '../component-interaction-committe-review';
import { InteractionInterview } from '../component-interaction-interview';
import { ProfileNavPane } from '../component-profile';

export const LeftContentPane: React.FC = () => {
    const activeTab: NavTabType = useSelector((state: RootState) => state.navigationTab.activeTab);

    return (
        <div className="container">
          { activeTab === NavTabType.Profile && (<ProfileNavPane/>)}
           { activeTab === NavTabType.CollegeNavigatoin && (<InteractionCollegeNav/>)}
           { activeTab === NavTabType.CollegeList && (<InteractionCollegeList/>)}
           { activeTab === NavTabType.ComitteReview && (<InteractionCommitteeReview/>)}
           { activeTab === NavTabType.Interview && (<InteractionInterview/>)}
        </div>
      );
}
