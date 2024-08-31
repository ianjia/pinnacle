import { useSelector } from 'react-redux';
import { Map } from '../component-map';
import { NavTabType } from '../../common';
import { RootState } from '../../store';
import { CommitteCanvas } from '../component-canvas-comittee';
import { InterviewCanvas } from '../component-canvas-interview';

export const Canvas: React.FC = () => {
    const activeTab: NavTabType = useSelector((state: RootState) => state.navigationTab.activeTab);

    return (
        <div >
            { (activeTab === NavTabType.CollegeNavigatoin ||  activeTab === NavTabType.CollegeList)&& (<Map/>)}
            { activeTab === NavTabType.ComitteReview && (<CommitteCanvas/>)}
            { activeTab === NavTabType.Interview && (<InterviewCanvas/>)}

    </div>
    )
}

