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

            const careerGoalsToDelete = careerGoals.filter(career => !career.name || career.name.trim().length === 0);
            for (const career of careerGoalsToDelete) {
                await careerGoalService.deleteById(career.id, userId);
            }

            const validCareerGoals = careerGoals.filter(career => career.name && career.name.trim().length > 0);

            dispatch(selectedProfileActions.setCareerGoalList(validCareerGoals));
        } catch (error: unknown) {
            logError(error);
        }
    };

    return { loadCareerGoalList };
}
