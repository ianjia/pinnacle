import { useDispatch, useSelector } from 'react-redux';
import { RootState, selectedProfileActions } from '../../../../../store';
import { ApExam, SchoolYear } from "../../../../../shared";
import { ApExamListCardProps } from "../data-list-types";

export function useApExamListCardProps(grade: SchoolYear): ApExamListCardProps {
  const dispatch = useDispatch();

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

  const gradeConfig = gradeMapping[grade];

  if (!gradeConfig) {
    throw new Error('Unexpected grade in useApExamListCardProps');
  }

  return {
    title: 'AP Exam List',
    apExamList: useSelector(gradeConfig.apExamListSelector),
    onAddApExam: () => {
      const newApExam: ApExam = {
        id: Date.now(),
        user_id: 0,
        name: '',
        year: undefined,
        score: undefined,
      };
      dispatch(gradeConfig.addAction(newApExam));
    },
    onUpdateApExam: (updatedApExam: ApExam) => {
      dispatch(
        gradeConfig.updateAction({
          id: updatedApExam.id,
          exam: updatedApExam,
        })
      );
    },
    onDeleteApExam: (apExamId: number) => {
      dispatch(gradeConfig.deleteAction(apExamId));
    },
  };
}
