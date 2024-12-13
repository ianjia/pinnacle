import { useDispatch } from 'react-redux';
import { logError } from '../../util';
import { AcademicCareerGoal } from '../../shared';
import { careerGoalService } from '../../components/component-service-proxy';
import { selectedProfileActions } from '../../store';

export function useCareerGoalListLoader() {
    const dispatch = useDispatch();

    const loadCareerGoalList = async (userId: number): Promise<void> => {
        try {
            const careerGoals: AcademicCareerGoal[] = await careerGoalService.getAllByUserId(userId);
            dispatch(selectedProfileActions.setCareerGoalList(careerGoals));
        } catch (error: unknown) {
            logError(error);
        }
    };

    return { loadCareerGoalList };
}
