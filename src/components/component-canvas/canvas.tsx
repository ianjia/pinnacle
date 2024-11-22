import { useSelector } from 'react-redux';
import { Map } from '../component-map';
import { NavTabType } from '../../shared';
import { RootState } from '../../store';
import { CommitteCanvas } from '../component-canvas-comittee';
import { InterviewCanvas } from '../component-canvas-interview';
import { ProfileCanvas } from '../component-canvas-profile/profile-canvas';
import { EssayCanvas } from '../component-canvas-essay';
import { CollegeListCanvas } from '../component-canvas-college-list';

export const Canvas: React.FC = () => {
    const activeTab: NavTabType = useSelector((state: RootState) => state.navigationTab.activeTab);

    return (
        <div >
            { activeTab === NavTabType.Profile && (<ProfileCanvas/>)}
            { activeTab === NavTabType.CollegeNavigatoin && (<Map collegeNameList={[]} />)}
            { activeTab === NavTabType.CollegeList && (<CollegeListCanvas/>)}
            { activeTab === NavTabType.ComitteReview && (<CommitteCanvas/>)}
            { activeTab === NavTabType.Interview && (<InterviewCanvas/>)}
            { activeTab === NavTabType.Essay && (<EssayCanvas/>)}
        </div>
    )
}

