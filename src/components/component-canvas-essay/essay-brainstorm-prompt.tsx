import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getCollegeNameKey } from '../component-map';
import { RootState, AppDispatch, essayWorkshopActions } from '../../store';
import { EssayIdeasGenerationRequest, ProgressModal, GenerateEssayIdeasTaskResult, TaskResult, TaskType, useTaskRunner } from '../component-service-proxy';
import './essay-brainstorm-prompt.css';
import { DropdownCustom } from '../component-customized-fluent-ui';
import { Major } from '../../shared';

// Todo - temp validity checker
function isPromptValid(prompt: string): boolean {
    return prompt.length >= 5;
}

export const EssayPrompt: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    // Redux values
    const college = useSelector((state: RootState) => state.essayWorkshop.college);
    const major = useSelector((state: RootState) => state.essayWorkshop.major);
    const essay_prompt = useSelector((state: RootState) => state.essayWorkshop.essayPrompt);
    const additional_ask = useSelector((state: RootState) => state.essayWorkshop.additionalAsk);

    // Local state initialized with Redux values
    const [collegeInput, setCollegeInput] = useState(college);
    const collegeInputRef = useRef<HTMLInputElement>(null);

    const [essayPromptInput, setEssayPromptInput] = useState(essay_prompt);
    const essayPromptInputRef = useRef<HTMLTextAreaElement>(null);

    const [additionalAskInput, setAdditionalAskInput] = useState(additional_ask);
    const additionalAskInputRef = useRef<HTMLTextAreaElement>(null);

    // Sync local state with Redux store when Redux values change
    useEffect(() => setCollegeInput(college), [college]);
    useEffect(() => setEssayPromptInput(essay_prompt), [essay_prompt]);
    useEffect(() => setAdditionalAskInput(additional_ask), [additional_ask]);

    const handleCollegeBlur = () => {
        const matchedCollegeName = getCollegeNameKey(collegeInput);
        if (matchedCollegeName && matchedCollegeName !== college) {
            dispatch(essayWorkshopActions.setCollege(matchedCollegeName));
        } else if (!matchedCollegeName) {
            alert("The college name you entered is not valid. Please re-enter.");
        }
    };

    const handleCollegeKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            collegeInputRef.current?.blur();
        }
    };

    const handleEssayPromptBlur = () => {
        if (isPromptValid(essayPromptInput) && essayPromptInput !== essay_prompt) {
            dispatch(essayWorkshopActions.setEssayPrompt(essayPromptInput));
        } else if (!isPromptValid(essayPromptInput)) {
            alert("The prompt you entered is not valid. Please re-enter.");
        }
    };

    const handleEssayPromptKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            essayPromptInputRef.current?.blur();
        }
    };

    const handleAdditionalAskBlur = () => {
        if (additionalAskInput !== additional_ask) {
            dispatch(essayWorkshopActions.setAdditionalAsk(additionalAskInput));
        }
    };

    const handleAdditionalAskKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            additionalAskInputRef.current?.blur();
        }
    };

    const { startTask: startEssayIdeasTask, showModal, progressMessage } = useTaskRunner({
        taskType: TaskType.GenerateEssayIdeas,
        requestData: { college, major, prompt: essay_prompt, additionalCollegeAsk: additional_ask } as EssayIdeasGenerationRequest, 
        onResult: (data: TaskResult) => {
            const resultList = (data as GenerateEssayIdeasTaskResult).ideas;
            for (const idea of resultList) {
                const ideaKey = uuidv4();
                dispatch(essayWorkshopActions.addIdea({ key: ideaKey, value: idea }));
            }
        }
    });

    const handleStartGenerateEssayIdeasTask = () => {
        if (isPromptValid(essay_prompt)) {
            startEssayIdeasTask();
        } else {
            alert("Invalid prompt, please check");
        }
    };

    return (
        <div className="essay-prompt">
            <ProgressModal show={showModal} message={progressMessage} />
            <h2>Essay Prompt</h2>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="college">College:</label>
                    <input
                        id="collegeInput"
                        type="text"
                        value={collegeInput}
                        ref={collegeInputRef}
                        onChange={(e) => setCollegeInput(e.target.value)}
                        onBlur={handleCollegeBlur}
                        onKeyDown={handleCollegeKeyPress}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="major">Major:</label>
                    <DropdownCustom
                        options={Major}
                        onOptionSelect={(e, option) =>
                            dispatch(essayWorkshopActions.setMajor(option.optionValue as Major))
                        }
                        value={major}
                        placeHolder={undefined}
                    />
                </div>
            </div>

            <div className="form-row full-width">
                <div className="form-group">
                    <label htmlFor="prompt">Essay Prompt:</label>
                    <textarea
                        id="prompt"
                        value={essayPromptInput}
                        ref={essayPromptInputRef}
                        onChange={(e) => setEssayPromptInput(e.target.value)}
                        onBlur={handleEssayPromptBlur}
                        onKeyDown={handleEssayPromptKeyPress}
                        className="full-width-textarea"
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="additionalCollegeAskOnEssay">Additional College Ask (Optional):</label>
                    <textarea
                        id="additionalAsk"
                        value={additionalAskInput}
                        ref={additionalAskInputRef}
                        onChange={(e) => setAdditionalAskInput(e.target.value)}
                        onBlur={handleAdditionalAskBlur}
                        onKeyDown={handleAdditionalAskKeyPress}
                        className="full-width-textarea"
                    />
                </div>
            </div>

            <button onClick={handleStartGenerateEssayIdeasTask} className="generate-btn">Generate Essay Ideas</button>
        </div>
    );
};
