import { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../../../auth";
import { committeeReviewService } from "../../../component-service-proxy";
import { committeeReviewActions, store } from "../../../../store";
import { CommitteeReview } from "../../../../shared";

export function useOnReviewCompleteCreator() {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);

  const onReviewComplete = useCallback(async (): Promise<void> => {
    try {
      // 1) Get the fresh review state from the store
      const {
        liveReviewResult,
        liveReviewCollege,
        liveReviewMajor,
        liveReviewId,
      } = store.getState().committeeReview;

      // 2) Build the CommitteeReview object with current data
      const reviewToCreate: CommitteeReview = {
        id: liveReviewId, // Might be 0 if new
        user_id: userId as number,
        college: liveReviewCollege,
        major: liveReviewMajor,
        review: liveReviewResult,
        time: new Date().toISOString(),
      };

      // 3) Create in the backend (returns new ID)
      const newId: number = await committeeReviewService.create(reviewToCreate);

      // 4) Update Redux with new ID
      dispatch(committeeReviewActions.setLiveReviewId(newId));

      // 5) Add the new committee review to interview history
      reviewToCreate.id = newId;
      dispatch(committeeReviewActions.addReviewToHistory(reviewToCreate));      

    } catch (error) {
      console.error("Error saving committee review to server:", error);
      throw error;
    }
  }, [dispatch, userId]);

  return onReviewComplete;
}
