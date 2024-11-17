import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, essayWorkshopActions } from '../../store';
import { EssayDraftRequest, EssayDraftTaskResult, EssayRefineRequest, EssayRefineTaskResult, ProgressModal, TaskResult, TaskType, useTaskRunner } from '../component-service-proxy';
import { useSelectedInfo } from './hooks/use-selected-idea-essay';
import { MarkdownMessageDisplay } from '../component-mark-down-display';
import './essay-draft-panel.css';

function isIdeaValid(idea: string | undefined): boolean {
    if (idea === undefined || idea.length <= 8) { // The way to check idea string length <= 8 is temparary
        return false;
    }

    return true;
}

export const EssayDraftPanel: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const {key, idea, essay} = useSelectedInfo();
    const ideas = useSelector((state: RootState) => state.essayWorkshop.ideas);
    const college = useSelector((state: RootState) => state.essayWorkshop.college);
    const major = useSelector((state: RootState) => state.essayWorkshop.major);
    const essay_prompt = useSelector((state: RootState) => state.essayWorkshop.essayPrompt);
    const additional_ask = useSelector((state: RootState) => state.essayWorkshop.additionalAsk);

    const [textAreaValue, setTextAreaValue] = useState<string>('');

    const [activeTask, setActiveTask] = useState<"draftEssay" | "refineEssay" | null>(null);

    const { startTask: startDraftEssayTask, showModal: showDraftEssayModal, progressMessage: progressDraftEssayMessage } = useTaskRunner({
        taskType: TaskType.DraftEssay,
        requestData: { college, major, prompt: essay_prompt, additionalCollegeAsk: additional_ask, 
                        idea: idea as string } as EssayDraftRequest, 
        onResult: (data: TaskResult) => {
            const result = (data as EssayDraftTaskResult).essay;
            dispatch(essayWorkshopActions.addEssay({ key: key as string, value: result }));
        }
    });

    const { startTask: startRefineEssayTask, showModal: showRefineEssayModal, progressMessage: progressRefineEssayMessage } = useTaskRunner({
        taskType: TaskType.RefineEssay,
        requestData: { college, major, prompt: essay_prompt, additionalCollegeAsk: additional_ask, 
                        idea: idea as string, essay: essay, feedback: textAreaValue } as EssayRefineRequest, 
        onResult: (data: TaskResult) => {
            const result = (data as EssayRefineTaskResult).essay;
            dispatch(essayWorkshopActions.addEssay({ key: key as string, value: result }));
        }
    });

    const handleDraft = () => {
      if (!isIdeaValid(idea)) {   
        alert("Please make sure an essay idea is selected");
        return;
      }
      setActiveTask("draftEssay");
      startDraftEssayTask();
    };

    const handleRefine = () => {
        if (!isIdeaValid(key) || essay === undefined) {   
            alert("Please make sure an essay idea is selected and essay draft exists");
            return;
        }
        setActiveTask("refineEssay");
        startRefineEssayTask();
    }

    return (
        <div>
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
            <div className="buttons-container">
                <button onClick={handleDraft} disabled={!key}>Draft</button>
                <button onClick={handleRefine} disabled={!key || !ideas}>Refine</button>
          </div>
            {essay ? (
                    <MarkdownMessageDisplay resultMessage={essay} />
                ) : ""
            }
            {essay && (
                <div className="textarea-container">
                    <div className="label-container">Refinement Feedback:</div>
                    <textarea
                    value={textAreaValue}
                    onChange={(e) => setTextAreaValue(e.target.value)}
                    />
                </div>
            )}
        </div>
    );
};
