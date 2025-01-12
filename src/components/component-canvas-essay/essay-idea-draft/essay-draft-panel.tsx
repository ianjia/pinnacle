import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, essayWorkshopActions, alertDialogActions } from '../../../store';
import { EssayDraftRequest, EssayDraftTaskResult, EssayRefineRequest, EssayRefineTaskResult, ProgressModal, TaskResult, TaskType, useTaskRunner } from '../../component-service-proxy';
import { useSelectedInfo } from './hooks/use-selected-idea-essay';
import { MarkdownMessageDisplay } from '../../component-mark-down-display';
import { Card } from '@fluentui/react-components';
import { useStyles } from './essay-draft-panel.styles';
import { useOnDraftCompleteCreator } from './hooks/use-on-draft-complete-creator';
import { useOnRefineCompleteCreator } from './hooks/use-on-refine-complete-creator';

function isIdeaValid(idea: string | undefined): boolean {
    if (idea === undefined || idea.length <= 10) { // The way to check idea string length <= 8 is temparary
        return false;
    }

    return true;
}

export const EssayDraftPanel: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const styles = useStyles();

    const {key, idea, essay} = useSelectedInfo();
    const ideas = useSelector((state: RootState) => state.essayWorkshop.ideas);
    const college = useSelector((state: RootState) => state.essayWorkshop.college);
    const major = useSelector((state: RootState) => state.essayWorkshop.major);
    const essay_prompt = useSelector((state: RootState) => state.essayWorkshop.essayPrompt);
    const additional_ask = useSelector((state: RootState) => state.essayWorkshop.additionalAsk);

    const onDraftComplete = useOnDraftCompleteCreator();
    const onRefineComplete = useOnRefineCompleteCreator();

    const [textAreaValue, setTextAreaValue] = useState<string>('');

    const [activeTask, setActiveTask] = useState<"draftEssay" | "refineEssay" | null>(null);

    const { startTask: startDraftEssayTask, showModal: showDraftEssayModal, progressMessage: progressDraftEssayMessage } = useTaskRunner({
        taskType: TaskType.DraftEssay,
        requestData: { college, major, prompt: essay_prompt, additionalInfo: additional_ask, 
                        idea: idea as string } as EssayDraftRequest, 
        onResult: (data: TaskResult) => {
            const result = (data as EssayDraftTaskResult).essay;
            dispatch(essayWorkshopActions.addEssay({ key: key as string, value: result }));
            dispatch(essayWorkshopActions.setLiveEssay(result));
            onDraftComplete();
        }
    });

    const { startTask: startRefineEssayTask, showModal: showRefineEssayModal, progressMessage: progressRefineEssayMessage } = useTaskRunner({
        taskType: TaskType.RefineEssay,
        requestData: { college, major, prompt: essay_prompt, additionalInfo: additional_ask, 
                        idea: idea as string, essay: essay, feedback: textAreaValue } as EssayRefineRequest, 
        onResult: (data: TaskResult) => {
            const result = (data as EssayRefineTaskResult).essay;
            dispatch(essayWorkshopActions.addEssay({ key: key as string, value: result }));
            dispatch(essayWorkshopActions.setLiveEssay(result));
            onRefineComplete();
        }
    });

    const handleDraft = () => {
      if (!isIdeaValid(idea)) {   
        dispatch(
            alertDialogActions.showAlert({
              title: 'Validation Error',
              message: 'Please make sure an essay idea is selected.',
            })
          );
        return;
      }
      setActiveTask("draftEssay");
      startDraftEssayTask();
    };

    const handleRefine = () => {
        if (!isIdeaValid(key) || essay === undefined) {   
            dispatch(
                alertDialogActions.showAlert({
                  title: 'Validation Error',
                  message: 'Please make sure an essay idea is selected and essay draft exists.',
                })
              );
            return;
        }
        setActiveTask("refineEssay");
        startRefineEssayTask();
    }

    return (
        <Card className={styles.card}>
            <h2 className={styles.header} style={{ textAlign: 'left' }}>Essay Draft</h2>

            <ProgressModal
                show={activeTask !== null && (showDraftEssayModal || showRefineEssayModal)}
                message={
                activeTask === "draftEssay"
                    ? progressDraftEssayMessage
                    : activeTask === "refineEssay"
                    ? progressRefineEssayMessage
                    : ""
                }
            />
            <div className={styles.grid}>
                <button className = {styles.buttonGenerate} onClick ={handleDraft} disabled={!key}>Draft</button>
                <button  className = {styles.buttonGenerate} onClick={handleRefine} disabled={!key || !ideas}>Refine</button>
            </div>
            {essay ? (
                    <MarkdownMessageDisplay resultMessage={essay} />
                ) : ""
            }
            {essay && (
                <div className="textarea-container">
                    <div className={styles.feedbackLabel}>Refinement Feedback:</div>
                    <textarea
                        className={styles.feedbackTextarea}
                        value={textAreaValue}
                        onChange={(e) => setTextAreaValue(e.target.value)}
                    />
                </div>
            )}
        </Card>
    );
};
