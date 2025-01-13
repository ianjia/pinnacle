import { useDispatch, useSelector } from 'react-redux';
import { alertDialogActions, RootState, selectedProfileActions } from '../../../../../store';
import { ApExam, SchoolYear } from "../../../../../shared";
import { ApExamListCardProps } from "../data-list-types";
import { apExamService } from '../../../../component-service-proxy';
import { useContext } from 'react';
import { AuthContext } from '../../../../../auth';

export function useApExamListCardProps(school_year: SchoolYear): ApExamListCardProps {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);

  const gradeMapping = {
    [SchoolYear.NINTH]: {
      apExamListSelector: (state: RootState) => state.selectedProfile.ninthGradeApExamList,
      addAction: selectedProfileActions.addNinthGradeApExam,
      updateAction: selectedProfileActions.updateNinthGradeApExam,
      deleteAction: selectedProfileActions.deleteNinthGradeApExam,
    },
    [SchoolYear.TENTH]: {
      apExamListSelector: (state: RootState) => state.selectedProfile.tenthGradeApExamList,
      addAction: selectedProfileActions.addTenthGradeApExam,
      updateAction: selectedProfileActions.updateTenthGradeApExam,
      deleteAction: selectedProfileActions.deleteTenthGradeApExam,
    },
    [SchoolYear.ELEVENTH]: {
      apExamListSelector: (state: RootState) => state.selectedProfile.eleventhGradeApExamList,
      addAction: selectedProfileActions.addEleventhGradeApExam,
      updateAction: selectedProfileActions.updateEleventhGradeApExam,
      deleteAction: selectedProfileActions.deleteEleventhGradeApExam,
    },
    [SchoolYear.TWELFTH]: {
      apExamListSelector: (state: RootState) => state.selectedProfile.twelfthGradeApExamList,
      addAction: selectedProfileActions.addTwelfthGradeApExam,
      updateAction: selectedProfileActions.updateTwelfthGradeApExam,
      deleteAction: selectedProfileActions.deleteTwelfthGradeApExam,
    },
  };

  const gradeConfig = gradeMapping[school_year];

  if (!gradeConfig) {
    throw new Error('Unexpected grade in useApExamListCardProps');
  }

  return {
    title: 'AP Exam List',
    apExamList: useSelector(gradeConfig.apExamListSelector),
    onAddApExam: async () => {
      try {
        const newApExam: ApExam = {
          id: Date.now(),
          user_id: userId as number,
          name: undefined,
          year: school_year,
          score: undefined,
        };
        const id: number = await apExamService.create(newApExam);
        newApExam.id = id;
        dispatch(gradeConfig.addAction(newApExam));
      } catch (error) {
        console.log("error in add AP Exam", error);
        dispatch(
          alertDialogActions.showAlert({
            title: 'Server Error',
            message: 'Failed to create Ap Exam, please try again, or re-sign-in to try.',
          })
        );
      }
    },
    onUpdateApExam: async (updatedApExam: ApExam) => {
      try {
        dispatch(
          gradeConfig.updateAction({
            id: updatedApExam.id,
            exam: updatedApExam,
          })
        );
        await apExamService.update(updatedApExam);
      } catch (error) {
        console.log("error in update AP Exam", error);
        dispatch(
          alertDialogActions.showAlert({
            title: 'Server Error',
            message: 'Failed to update the AP Exam, please try again, or re-sign-in to try.',
          })
        );
      }
    },
    onDeleteApExam: async (apExamId: number) => {
      try {
        dispatch(gradeConfig.deleteAction(apExamId));
        await apExamService.deleteById(apExamId, userId as number);
      } catch (error) {
        console.log("error in delete AP Exam", error);
        dispatch(
          alertDialogActions.showAlert({
            title: 'Server Error',
            message: 'Failed to delete the AP Exam, please try again, or re-sign-in to try.',
          })
        );
      }
    },
  };
}
