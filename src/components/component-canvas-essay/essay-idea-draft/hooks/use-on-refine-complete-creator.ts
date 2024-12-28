
import { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../../../auth";
import { essayDataService } from "../../../component-service-proxy";
import { essayWorkshopActions, store } from "../../../../store";
import { Essay } from "../../../../shared";

export function useOnRefineCompleteCreator() {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);

  const onRefineComplete = useCallback(async (): Promise<void> => {
    try {
      // 1) Get the fresh state from the store
      const {
        essayPrompt, 
        liveEssayId,
        liveEssay,
      } = store.getState().essayWorkshop;

      // 2) Build the Essay object with current data
      const essayToCreate: Essay = {
        id: liveEssayId, 
        user_id: userId as number,
        prompt: essayPrompt,
        essay: liveEssay,
        time: new Date().toISOString(),
      };

      // 3) Create in the backend (returns new ID)
      await essayDataService.update(essayToCreate);

      // 4) Update Redux with the new refined essay
      dispatch(
        essayWorkshopActions.setEssayFieldInHistory({
          id: liveEssayId,
          essay: liveEssay,
        })
      );
    } catch (error) {
      console.error("Error saving committee review to server:", error);
      throw error;
    }
  }, [dispatch, userId]);

  return onRefineComplete;
}
