import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, essayWorkshopActions, alertDialogActions, useBasicInfoFilled } from '../../../store';
import { EssayDraftRequest, EssayDraftTaskResult, EssayRefineRequest, EssayRefineTaskResult, ProgressModal, TaskResult, TaskType, useTaskRunner } from '../../component-service-proxy';
import { useSelectedInfo } from './hooks/use-selected-idea-essay';
import { MarkdownMessageDisplay } from '../../component-mark-down-display';
import { Button, Card, Textarea } from '@fluentui/react-components';
import { useOnDraftCompleteCreator } from './hooks/use-on-draft-complete-creator';
import { useOnRefineCompleteCreator } from './hooks/use-on-refine-complete-creator';
import { useCardStyles } from './essay-common-card.styles';
import { useDraftStyles } from './essay-draft-panel.styles';

function isIdeaValid(idea: string | undefined): boolean {
    if (idea === undefined || idea.length <= 10) { // The way to check idea string length <= 8 is temparary
        return false;
    }

    return true;
}

export const EssayDraftPanel: React.FC = () => {
  const card = useCardStyles();
  const s = useDraftStyles();
  const dispatch: AppDispatch = useDispatch();

  /* selected idea / essay from hook */
  const { key, idea, essay } = useSelectedInfo();

  /* redux state */
  const college = useSelector((st: RootState) => st.essayWorkshop.college);
  const major = useSelector((st: RootState) => st.essayWorkshop.major);
  const prompt = useSelector((st: RootState) => st.essayWorkshop.essayPrompt);
  const addn = useSelector((st: RootState) => st.essayWorkshop.additionalAsk);

  /* callbacks for higher‑level side‑effects */
  const onDraftDone = useOnDraftCompleteCreator();
  const onRefineDone = useOnRefineCompleteCreator();

  /* local state */
  const [feedback, setFeedback] = useState('');
  const [active, setActive] = useState<null | 'draft' | 'refine'>(null);

  const hasProfile = useBasicInfoFilled();

  /* draft task runner */
  const {
    startTask: draft,
    showModal: showDraft,
    progressMessage: msgDraft,
  } = useTaskRunner({
    taskType: TaskType.DraftEssay,
    requestData: {
      college,
      major,
      prompt,
      additionalInfo: addn,
      idea,
    } as EssayDraftRequest,
    onResult: (d: TaskResult) => {
      const res = (d as EssayDraftTaskResult).essay;
      dispatch(essayWorkshopActions.addEssay({ key: key!, value: res }));
      dispatch(essayWorkshopActions.setLiveEssay(res));
      onDraftDone();
    },
  });

  /* refine task runner */
  const {
    startTask: refine,
    showModal: showRef,
    progressMessage: msgRef,
  } = useTaskRunner({
    taskType: TaskType.RefineEssay,
    requestData: {
      college,
      major,
      prompt,
      additionalInfo: addn,
      idea,
      essay,
      feedback,
    } as EssayRefineRequest,
    onResult: (d: TaskResult) => {
      const res = (d as EssayRefineTaskResult).essay;
      dispatch(essayWorkshopActions.addEssay({ key: key!, value: res }));
      dispatch(essayWorkshopActions.setLiveEssay(res));
      onRefineDone();
    },
  });

  /* ---------- handlers ---------- */
  const runDraft = () => {
    if (!hasProfile)
      return dispatch(
        alertDialogActions.showAlert({
          title: 'Insuffient Information',
          message: 'Fill basic profile first.',
        })
      );
    if (!isIdeaValid(idea))
      return dispatch(
        alertDialogActions.showAlert({
          title: 'Validation Error',
          message: 'Select a valid idea first.',
        })
      );
    setActive('draft');
    draft();
  };

  const runRefine = () => {
    if (!hasProfile)
      return dispatch(
        alertDialogActions.showAlert({
          title: 'Insuffient Information',
          message: 'Fill basic profile first.',
        })
      );
    if (!isIdeaValid(idea) || !essay)
      return dispatch(
        alertDialogActions.showAlert({
          title: 'Validation Error',
          message: 'Draft the essay first.',
        })
      );
    setActive('refine');
    refine();
  };

  /* ---------- JSX ---------- */
  return (
    <Card className={card.card}>
      <h2 className={card.header}>Essay Draft</h2>

      <ProgressModal
        show={active !== null && (showDraft || showRef)}
        message={active === 'draft' ? msgDraft : msgRef}
      />

      {/* buttons */}
      <div className={s.grid}>
        <Button className={s.button} onClick={runDraft} disabled={!key}>
          Draft
        </Button>
        <Button
          className={s.button}
          onClick={runRefine}
          disabled={!key || !essay}
        >
          Refine
        </Button>
      </div>

      {/* current essay */}
      {essay && <MarkdownMessageDisplay resultMessage={essay} />}

      {/* feedback & refine */}
      {essay && (
        <div className={s.feedbackBlock}>
          <strong>Refinement feedback:</strong>
          <Textarea
            resize="vertical"
            className={s.textarea}
            value={feedback}
            onChange={(_, d) => setFeedback(d.value)}
          />
        </div>
      )}
    </Card>
  );
};