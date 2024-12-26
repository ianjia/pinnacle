import { useDispatch } from 'react-redux';
import { logError } from '../../util';
import { CollegeAdmissionData } from '../../shared';
import { collegeAdmissionDataService } from '../../components/component-service-proxy';
import { collegeListWorkshopActions } from '../../store';

export function useCollegeListRecordLoader() {
    const dispatch = useDispatch();

    const loadCollegeList = async (userId: number): Promise<void> => {
        try {
            const collegeList: CollegeAdmissionData[] = await collegeAdmissionDataService.getAllByUserId(userId);
            dispatch(collegeListWorkshopActions.setCollegeList(collegeList));
        } catch (error: unknown) {
            logError(error);
        }
    };

    return { loadCollegeList };
}
