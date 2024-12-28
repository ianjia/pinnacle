
import { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../../../auth";
import { essayDataService } from "../../../component-service-proxy";
import { essayWorkshopActions, store } from "../../../../store";
import { Essay } from "../../../../shared";

export function useOnDraftCompleteCreator() {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);

  const onDraftComplete = useCallback(async (): Promise<void> => {
    try {
      // 1) Get the fresh state from the store
      const {
        essayPrompt, 
        liveEssayId,
        liveEssay,
      } = store.getState().essayWorkshop;

      // 2) Build the Essay object with current data
      const essayToCreate: Essay = {
        id: liveEssayId, // Might be 0 if new
        user_id: userId as number,
        prompt: essayPrompt,
        essay: liveEssay,
        time: new Date().toISOString(),
      };

      // 3) Create in the backend (returns new ID)
      const newId: number = await essayDataService.create(essayToCreate);

      // 4) Update Redux with new ID
      dispatch(essayWorkshopActions.setLiveEssayId(newId));

      // 5) Add the new committee review to interview history
      essayToCreate.id = newId;
      dispatch(essayWorkshopActions.addEssayToHistory(essayToCreate));      

    } catch (error) {
      console.error("Error saving committee review to server:", error);
      throw error;
    }
  }, [dispatch, userId]);

  return onDraftComplete;
}
