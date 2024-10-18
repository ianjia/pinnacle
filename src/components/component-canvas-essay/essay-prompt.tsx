import React, { useState } from 'react';
import { IEssayPrompt } from './essay-model';
import './essay-prompt.css';

interface IEssayPromptProps {
    onGenerateEssayIdeas: (essayPrompt: IEssayPrompt) => void;
}

export const EssayPrompt: React.FC<IEssayPromptProps> = ({ onGenerateEssayIdeas }) => {
    const [formValues, setFormValues] = useState<IEssayPrompt>({
        college: '',
        major: '',
        prompt: '',
        additionalCollegeAskOnEssay: '',
        additonalStudentBackground: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        onGenerateEssayIdeas(formValues);
    };

    return (
        <div className="essay-prompt">
            <h2>Essay Prompt</h2>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="college">College:</label>
                    <input
                        type="text"
                        id="college"
                        name="college"
                        value={formValues.college}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="major">Major (optional):</label>
                    <input
                        type="text"
                        id="major"
                        name="major"
                        value={formValues.major}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="additionalCollegeAskOnEssay">Additional College Ask:</label>
                    <textarea
                        id="additionalCollegeAskOnEssay"
                        name="additionalCollegeAskOnEssay"
                        value={formValues.additionalCollegeAskOnEssay}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="additonalStudentBackground">Student Background:</label>
                    <textarea
                        id="additonalStudentBackground"
                        name="additonalStudentBackground"
                        value={formValues.additonalStudentBackground}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row full-width">
                <div className="form-group">
                    <label htmlFor="prompt">Essay Prompt:</label>
                    <textarea
                        id="prompt"
                        name="prompt"
                        value={formValues.prompt}
                        onChange={handleChange}
                        className="full-width-textarea"
                    />
                </div>
            </div>

            <button onClick={handleSubmit} className="generate-btn">Generate/Refine Essay Ideas</button>
        </div>
    );
};
