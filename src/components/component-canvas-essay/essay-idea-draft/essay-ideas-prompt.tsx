/*** essay-prompt.tsx ***/
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardPreview,
  Field,
  Input,
  Textarea,
  Button,
} from '@fluentui/react-components';

import { getCollegeNameKey } from '../../component-map';
import { RootState, AppDispatch, essayWorkshopActions } from '../../../store';
import {
  EssayIdeasGenerationRequest,
  ProgressModal,
  GenerateEssayIdeasTaskResult,
  TaskResult,
  TaskType,
  useTaskRunner,
} from '../../component-service-proxy';
import { DropdownCustom } from '../../component-customized-fluent-ui';
import { Major } from '../../../shared';
import { useStyles } from './essay-ideas-prompt.styles';

function isPromptValid(prompt: string): boolean {
  // For now, just check prompt length
  return prompt.length >= 10;
}

export const EssayPrompt: React.FC = () => {
  const styles = useStyles();
  const dispatch: AppDispatch = useDispatch();

  // --- Redux values ---
  const college = useSelector((state: RootState) => state.essayWorkshop.college);
  const major = useSelector((state: RootState) => state.essayWorkshop.major);
  const essay_prompt = useSelector(
    (state: RootState) => state.essayWorkshop.essayPrompt
  );
  const additional_ask = useSelector(
    (state: RootState) => state.essayWorkshop.additionalAsk
  );

  // --- Local state ---
  const [collegeInput, setCollegeInput] = useState(college);
  const collegeInputRef = useRef<HTMLInputElement>(null);

  const [essayPromptInput, setEssayPromptInput] = useState(essay_prompt);
  const essayPromptInputRef = useRef<HTMLTextAreaElement>(null);

  const [additionalAskInput, setAdditionalAskInput] = useState(additional_ask);
  const additionalAskInputRef = useRef<HTMLTextAreaElement>(null);

  // --- Sync local state with Redux store when Redux values change ---
  useEffect(() => setCollegeInput(college), [college]);
  useEffect(() => setEssayPromptInput(essay_prompt), [essay_prompt]);
  useEffect(() => setAdditionalAskInput(additional_ask), [additional_ask]);

  // --- Handlers ---
  const handleCollegeBlur = () => {
    const matchedCollegeName = getCollegeNameKey(collegeInput);
    if (matchedCollegeName && matchedCollegeName !== college) {
      dispatch(essayWorkshopActions.setCollege(matchedCollegeName));
    } else if (!matchedCollegeName) {
      alert('The college name you entered is not valid. Please re-enter.');
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
      alert('The prompt you entered is not valid. Please re-enter.');
    }
  };

  const handleAdditionalAskBlur = () => {
    if (additionalAskInput !== additional_ask) {
      dispatch(essayWorkshopActions.setAdditionalAsk(additionalAskInput));
    }
  };

  const handleAdditionalAskKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter') {
      additionalAskInputRef.current?.blur();
    }
  };

  // --- Task Runner for generating essay ideas ---
  const {
    startTask: startEssayIdeasTask,
    showModal,
    progressMessage,
  } = useTaskRunner({
    taskType: TaskType.GenerateEssayIdeas,
    requestData: {
      college,
      major,
      prompt: essay_prompt,
      additionalCollegeAsk: additional_ask,
    } as EssayIdeasGenerationRequest,
    onResult: (data: TaskResult) => {
      const resultList = (data as GenerateEssayIdeasTaskResult).ideas;
      for (const idea of resultList) {
        const ideaKey = uuidv4();
        dispatch(essayWorkshopActions.addIdea({ key: ideaKey, value: idea }));
      }
    },
  });
  

  const handleStartGenerateEssayIdeasTask = () => {
    if (isPromptValid(essay_prompt)) {
      startEssayIdeasTask();
    } else {
      alert('Invalid prompt, please check');
    }
  };

  return (
    <div className={styles.container}>
      <ProgressModal show={showModal} message={progressMessage} />

      <Card className={styles.card}>
        <h2 className={styles.header} style={{ textAlign: 'left' }}>Essay Prompt</h2>

        <CardPreview className={styles.cardPreview}>
          <div className={styles.grid}>
            {/* College (left column) */}
            <Field label="College" className={styles.field}>
              <Input
                className={styles.input}
                id="collegeInput"
                ref={collegeInputRef}
                value={collegeInput}
                onChange={(e) => setCollegeInput(e.target.value)}
                onBlur={handleCollegeBlur}
                onKeyDown={handleCollegeKeyPress}
              />
            </Field>

            {/* Major (right column) */}
            <Field label="Major" className={styles.field}>
              <DropdownCustom
                options={Major}
                onOptionSelect={(e, option) =>
                  dispatch(
                    essayWorkshopActions.setMajor(option.optionValue as Major)
                  )
                }
                value={major}
                placeHolder="Select a major"
              />
            </Field>

            {/* Essay Prompt (full-width) */}
            <Field
              label="Essay Prompt"
              className={`${styles.field} ${styles.fullWidth}`}
            >
              <Textarea
                className={styles.textarea}
                id="prompt"
                value={essayPromptInput}
                ref={essayPromptInputRef}
                onChange={(e) => setEssayPromptInput(e.target.value)}
                onBlur={handleEssayPromptBlur}
                rows={3}
              />
            </Field>

            {/* Additional Ask (full-width) */}
            <Field
              label="Additional College Ask (Optional)"
              className={`${styles.field} ${styles.fullWidth}`}
            >
              <Textarea
                className={styles.textarea}
                id="additionalAsk"
                value={additionalAskInput}
                ref={additionalAskInputRef}
                onChange={(e) => setAdditionalAskInput(e.target.value)}
                onBlur={handleAdditionalAskBlur}
                onKeyDown={handleAdditionalAskKeyPress}
                rows={3}
              />
            </Field>
          </div>
        </CardPreview>

        <Field className={styles.buttonField}>
          <Button
            className={styles.buttonGenerate}
            onClick={handleStartGenerateEssayIdeasTask}
          >
            Generate Essay Ideas
          </Button>
        </Field>
      </Card>
    </div>
  );
};
