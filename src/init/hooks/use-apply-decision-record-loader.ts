import { useDispatch } from 'react-redux';
import { applyDecisionService } from "../../components/component-service-proxy";
import { collegeListWorkshopActions } from "../../store";
import { logError } from '../../util';

export function useApplyDecisionLoader() {
    const dispatch = useDispatch();

    const loadApplyDecision = async (userId: number): Promise<void> => {
        try {
            const data = await applyDecisionService.getById(userId);
            dispatch(collegeListWorkshopActions.setRecommendEdEaRegular(data.decision))
        } catch (error: unknown) {
            logError(error);
        }
    };

    return { loadApplyDecision };
}
