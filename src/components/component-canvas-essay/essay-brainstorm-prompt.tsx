import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getCollegeNameKey } from '../component-map';
import { RootState, AppDispatch, essayWorkshopActions} from '../../store';
import { SpecializedProgram } from '../component-specalized-program';
import { EssayIdeasGenerationRequest, ProgressModal, GenerateEssayIdeasTaskResult, TaskResult, TaskType, useTaskRunner } from '../component-service-proxy';
import './essay-brainstorm-prompt.css';

// @Todo: Temparary prompt validity check place holder function
function isPromptValid(prompt: string) : boolean {
    return prompt.length >= 5;
}

export const EssayPrompt: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const [collegeInput, setCollegeInput] = useState('');
    const collegeInputRef = useRef<HTMLInputElement>(null); // Reference for the input field

    const [essayPromptInput, setEssayPromptInput] = useState('');
    const essayPromptInputRef = useRef<HTMLTextAreaElement>(null);

    const [additionalAskInput, setAdditionalAskInput] = useState('');
    const additionalAskInputRef = useRef<HTMLTextAreaElement>(null);    

    const college: string = useSelector((state: RootState) => state.essayWorkshop.college);
    const major: string = useSelector((state: RootState) => state.essayWorkshop.major);
    const essay_prompt: string = useSelector((state: RootState) => state.essayWorkshop.essayPrompt);
    const additional_ask: string = useSelector((state: RootState) => state.essayWorkshop.additionalAsk);

    const handleCollegeBlur = () => {
        const matchedCollegeName = getCollegeNameKey(collegeInput); // Fuzzy search/match
        
        if (matchedCollegeName) {
            // Update collegeInput with the matched college name
            setCollegeInput(matchedCollegeName);
            dispatch(essayWorkshopActions.setCollege(matchedCollegeName));
        } else {
            // Alert user if no match is found
            alert("The college name you entered is not valid. Please re-enter.");
        }
    };
    const handleCollegeKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // Trigger blur to remove focus, which in turn calls handleCollegeBlur due to onBlur event
            collegeInputRef.current?.blur();
        }
    };

    const handleEssayPromptBlur = () => {
        if (isPromptValid(essayPromptInput)) {
            dispatch(essayWorkshopActions.setEssayPrompt(essayPromptInput));
        } else {
            alert("The prompt you entered is not valid. Please re-enter.");
        }
    };
    const handleEssayPromptKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            essayPromptInputRef.current?.blur();
        }
    };

    const handleAdditionalAskBlur = () => {
        dispatch(essayWorkshopActions.setEssayPrompt(additionalAskInput));
    };
    const handleAdditionalAskKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            additionalAskInputRef.current?.blur();
        }
    };

    const {startTask: startEssayIdeasTask, showModal, progressMessage } = useTaskRunner({
        taskType: TaskType.GenerateEssayIdeas,
        requestData: {college: college, major: major, prompt: essay_prompt, additionalCollegeAsk: additional_ask} as EssayIdeasGenerationRequest, 
        onResult: (data: TaskResult) => {
          const resultList = (data as GenerateEssayIdeasTaskResult).ideas;
          for (const idea of resultList) {
            const ideaKey = uuidv4();
            dispatch(essayWorkshopActions.addIdea({key:ideaKey, value: idea})); 
          }
        }
    })

    const handleStartGenerateEssayIdeasTask = () => {
        if (isPromptValid(essay_prompt)) {
            startEssayIdeasTask();
        } else {
            alert("Invalid prompt, please check");
        }
    }

    return (
        <div className="essay-prompt">
            <ProgressModal show = {showModal} message = {progressMessage}/>
            <h2>Essay Prompt</h2>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="college">College:</label>
                    <input
                        id="collegeInput"
                        type="text"
                        value={collegeInput}
                        ref={collegeInputRef} // Assign the ref to the input
                        onChange={(e) => setCollegeInput(e.target.value)}
                        onBlur={handleCollegeBlur} // Handle blur for both Enter and clicking outside
                        onKeyDown={handleCollegeKeyPress} // Handle Enter key press
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="major">Major:</label>
                    <SpecializedProgram
                        value={major}
                        onPreferenceChange={(newMajor) => dispatch(essayWorkshopActions.setMajor(newMajor))}
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


