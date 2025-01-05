import React, { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardPreview,
  Field,
  Textarea,
  Button,
  mergeClasses,
  Dropdown,
  Option,
  SelectionEvents,
  OptionOnSelectData,
  Popover,
  PopoverSurface,
  PopoverTrigger,
} from '@fluentui/react-components';
import { Info24Regular } from '@fluentui/react-icons';

import { getCollegeNameKey } from '../../component-navigation-map';
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

/**
 * For demonstration, we still keep this basic length check,
 * but you can customize it as needed.
 */
function isPromptValid(prompt: string): boolean {
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

  const collegeList = useSelector(
    (state: RootState) => state.collegeListWorkshop.collegeList
  );

  // --- Local refs for textareas (if needed) ---
  const essayPromptInputRef = useRef<HTMLTextAreaElement>(null);
  const additionalAskInputRef = useRef<HTMLTextAreaElement>(null);

  // --- Sync local textareas with Redux store when Redux values change ---
  useEffect(() => {
    if (essayPromptInputRef.current) {
      essayPromptInputRef.current.value = essay_prompt;
    }
  }, [essay_prompt]);

  useEffect(() => {
    if (additionalAskInputRef.current) {
      additionalAskInputRef.current.value = additional_ask;
    }
  }, [additional_ask]);

  // --- Handlers for textareas ---
  const handleEssayPromptBlur = () => {
    const currentValue = essayPromptInputRef.current?.value || '';
    if (isPromptValid(currentValue) && currentValue !== essay_prompt) {
      dispatch(essayWorkshopActions.setEssayPrompt(currentValue));
    } else if (!isPromptValid(currentValue)) {
      alert('The prompt you entered is not valid. Please re-enter.');
    }
  };

  const handleAdditionalAskBlur = () => {
    const currentValue = additionalAskInputRef.current?.value || '';
    if (currentValue !== additional_ask) {
      dispatch(essayWorkshopActions.setAdditionalAsk(currentValue));
    }
  };

  /**
   * Handle user selecting a different college in the dropdown.
   */
  const handleCollegeSelect = (event: SelectionEvents, data: OptionOnSelectData) => {
    if (!data.optionValue) {
      alert('The college name you selected is not valid. Please check.');
      return;
    }
    const matchedCollegeName = getCollegeNameKey(data.optionValue);
    if (!matchedCollegeName) {
      alert('The college name you selected is not valid. Please check.');
      return;
    }
    dispatch(essayWorkshopActions.setCollege(matchedCollegeName));
  };

  /**
   * Handler for Major changes (using custom dropdown).
   */
  const handleMajorSelect = (newMajor: Major) => {
    dispatch(essayWorkshopActions.setMajor(newMajor));
  };

  // --- Task Runner for generating essay ideas ---
  const { startTask: startEssayIdeasTask, showModal, progressMessage } = useTaskRunner({
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

  /**
   * Start the “Generate Essay Ideas” task if the prompt is valid.
   */
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
        <h2 className={styles.header} style={{ textAlign: 'left' }}>
          Essay Prompt
        </h2>

        <CardPreview className={styles.cardPreview}>
          <div className={styles.grid}>
            {/* College (left column) with popover */}
            <Field
              label={
                <span className={styles.labelContainer}>
                  <span>College</span>
                  <Popover positioning={{ position: 'after', align: 'top' }}>
                    <PopoverTrigger>
                      <Button
                        icon={<Info24Regular />}
                        appearance="subtle"
                        size="small"
                        aria-label="Information"
                        className={styles.infoIcon}
                      />
                    </PopoverTrigger>
                    <PopoverSurface>
                      Please make sure the college list was created 
                      before selecting a college here
                    </PopoverSurface>
                  </Popover>
                </span>
              }
              className={styles.field}
            >
              <Dropdown
                placeholder="Select a college"
                value={college}
                onOptionSelect={handleCollegeSelect}
                disabled={collegeList.length === 0} // disable if no colleges
              >
                {collegeList.map((c) => (
                  <Option key={c.id} value={c.college}>
                    {c.college}
                  </Option>
                ))}
              </Dropdown>
            </Field>

            {/* Major (right column) */}
            <Field label="Major" className={styles.field}>
              <DropdownCustom
                options={Major}
                onOptionSelect={(e, option) => handleMajorSelect(option.optionValue as Major)}
                value={major}
                placeHolder="Select a major"
              />
            </Field>

            {/* Essay Prompt (full-width) */}
            <Field
              label="Essay Prompt"
              className={mergeClasses(styles.field, styles.fullWidth)}
            >
              <Textarea
                className={styles.textarea}
                id="prompt"
                defaultValue={essay_prompt}
                ref={essayPromptInputRef}
                onBlur={handleEssayPromptBlur}
                rows={3}
              />
            </Field>

            {/* Additional Ask (full-width) */}
            <Field
              label="Additional College Ask (Optional)"
              className={mergeClasses(styles.field, styles.fullWidth)}
            >
              <Textarea
                className={styles.textarea}
                id="additionalAsk"
                defaultValue={additional_ask}
                ref={additionalAskInputRef}
                onBlur={handleAdditionalAskBlur}
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
