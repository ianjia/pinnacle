import React, { useEffect, useRef, useState } from 'react';
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
import { RootState, AppDispatch, essayWorkshopActions, alertDialogActions, useBasicInfoFilled } from '../../../store';
import {
  EssayIdeasGenerationRequest,
  ProgressModal,
  GenerateEssayIdeasTaskResult,
  TaskResult,
  TaskType,
  useTaskRunner,
  PromptAnalysisTaskResult,
} from '../../component-service-proxy';
import { DropdownCustom } from '../../component-customized-fluent-ui';
import { Major } from '../../../shared';
import { usePromptStyles } from './essay-ideas-prompt.styles';
import { useCardStyles } from './essay-common-card.styles';

/**
 * For demonstration, we still keep this basic length check,
 * but you can customize it as needed.
 */
function isPromptValid(prompt: string): boolean {
  return prompt.length >= 10;
}

export const EssayPrompt: React.FC = () => {
  const cardCommon = useCardStyles();
  const styles = usePromptStyles();
  const dispatch: AppDispatch = useDispatch();

  /* Redux state */
  const college     = useSelector((s: RootState) => s.essayWorkshop.college);
  const major       = useSelector((s: RootState) => s.essayWorkshop.major);
  const essayPrompt = useSelector((s: RootState) => s.essayWorkshop.essayPrompt);
  const addnAsk     = useSelector((s: RootState) => s.essayWorkshop.additionalAsk);
  const collegeList = useSelector((s: RootState) => s.collegeListWorkshop.collegeList);

  /* Local refs to sync textarea values */
  const promptRef   = useRef<HTMLTextAreaElement>(null);
  const askRef      = useRef<HTMLTextAreaElement>(null);

  /* keep textareas in sync with Redux when Redux modified elsewhere */
  useEffect(() => { if (promptRef.current) promptRef.current.value = essayPrompt; }, [essayPrompt]);
  useEffect(() => { if (askRef.current)    askRef.current.value    = addnAsk;    }, [addnAsk]);

  /* local task indicator */
  const [active, setActive] = useState<null | 'ideas' | 'analysis'>(null);

  const hasProfile = useBasicInfoFilled();

  /* ---------- handlers ---------- */
  const onCollegeSelect = (_: SelectionEvents, d: OptionOnSelectData) => {
    const key = d.optionValue && getCollegeNameKey(d.optionValue);
    if (!key) {
      dispatch(alertDialogActions.showAlert({ title: 'Validation Error', message: 'Invalid college.' }));
      return;
    }
    dispatch(essayWorkshopActions.setCollege(key));
  };

  const onMajorSelect = (m: Major) => dispatch(essayWorkshopActions.setMajor(m));

  const savePrompt = () => {
    const v = promptRef.current?.value ?? '';
    if (!isPromptValid(v)) {
      dispatch(alertDialogActions.showAlert({ title: 'Validation Error', message: 'Prompt too short.' }));
      return;
    }
    if (v !== essayPrompt) dispatch(essayWorkshopActions.setEssayPrompt(v));
  };

  const saveAsk = () => {
    const v = askRef.current?.value ?? '';
    if (v !== addnAsk) dispatch(essayWorkshopActions.setAdditionalAsk(v));
  };

  /* ---------- task runners ---------- */
  const { startTask: genIdeas, showModal: showIdeas, progressMessage: msgIdeas } =
    useTaskRunner({
      taskType: TaskType.GenerateEssayIdeas,
      requestData: { college, major, prompt: essayPrompt, additionalInfo: addnAsk } as EssayIdeasGenerationRequest,
      onResult: (data: TaskResult) => {
        dispatch(essayWorkshopActions.clearIdeas());
        (data as GenerateEssayIdeasTaskResult).ideas.forEach((idea) =>
          dispatch(essayWorkshopActions.addIdea({ key: uuidv4(), value: idea })),
        );
        setActive(null);
      },
    });

  const { startTask: analyse, showModal: showAnal, progressMessage: msgAnal } =
    useTaskRunner({
      taskType: TaskType.EssayPromptAnalysis,
      requestData: { college, major, prompt: essayPrompt, additionalInfo: addnAsk } as EssayIdeasGenerationRequest,
      onResult: (d: TaskResult) => {
        dispatch(essayWorkshopActions.setPromptAnalysis((d as PromptAnalysisTaskResult).analysis));
        setActive(null);
      },
    });

  const runIdeas = () => {
    if (!hasProfile) {
      dispatch(alertDialogActions.showAlert({ title: 'Insuffient Information', message: 'Fill basic profile first.' }));
      return;
    }
    if (isPromptValid(essayPrompt)) {
      setActive('ideas');
      genIdeas();
    }
  };

  const runAnalysis = () => {
    if (!hasProfile) {
      dispatch(alertDialogActions.showAlert({ title: 'Insuffient Information', message: 'Fill basic profile first.' }));
      return;
    }
    if (isPromptValid(essayPrompt)) {
      setActive('analysis');
      analyse();
    }
  };

  /* ---------- JSX ---------- */
  return (
    <div className={styles.container}>
      <ProgressModal
        show={active !== null && (showIdeas || showAnal)}
        message={active === 'ideas' ? msgIdeas : msgAnal}
      />

      <Card className={cardCommon.card}>
        <h2 className={cardCommon.header}>Essay Prompt</h2>

        <CardPreview className={styles.cardPreview}>
          <div className={styles.grid}>
            {/* College + popover */}
            <Field
              label={
                <span className={styles.labelWrap}>
                  College
                  <Popover positioning={{ position: 'after', align: 'top' }}>
                    <PopoverTrigger>
                      <Button
                        appearance="subtle"
                        icon={<Info24Regular />}
                        size="small"
                        aria-label="info"
                        className={styles.infoIcon}
                      />
                    </PopoverTrigger>
                    <PopoverSurface>
                      Make sure you have a recommended college list first.
                    </PopoverSurface>
                  </Popover>
                </span>
              }
              className={styles.field}
            >
              <Dropdown
                placeholder="Select college"
                value={college}
                onOptionSelect={onCollegeSelect}
                disabled={!collegeList.length}
              >
                {collegeList.map((c) => (
                  <Option key={c.id} value={c.college}>
                    {c.college}
                  </Option>
                ))}
              </Dropdown>
            </Field>

            {/* Major */}
            <Field label="Major" className={styles.field}>
              <DropdownCustom
                options={Major}
                value={major}
                placeHolder="Select major"
                onOptionSelect={(_, o) => onMajorSelect(o.optionValue as Major)}
              />
            </Field>

            {/* Prompt */}
            <Field
              label="Essay Prompt"
              className={mergeClasses(styles.field, styles.fullWidth)}
            >
              <Textarea
                ref={promptRef}
                onBlur={savePrompt}
                className={styles.textarea}
              />
            </Field>

            {/* Additional ask */}
            <Field
              label="Additional Information (optional)"
              className={mergeClasses(styles.field, styles.fullWidth)}
            >
              <Textarea
                ref={askRef}
                onBlur={saveAsk}
                className={styles.textareaSmall}
              />
            </Field>
          </div>
        </CardPreview>

        {/* buttons */}
        <div className={styles.grid}>
          <Field className={styles.buttonField}>
            <Button appearance = 'primary' className={styles.button} onClick={runAnalysis}>
              Analyze Prompt
            </Button>
          </Field>
          <Field className={styles.buttonField}>
            <Button appearance = 'primary' className={styles.button} onClick={runIdeas}>
              Generate Essay Ideas
            </Button>
          </Field>
        </div>
      </Card>
    </div>
  );
};