import React, { useContext, useMemo, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  mergeClasses,
  Combobox,
  Option as ComboboxOption,
  OptionOnSelectData,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Button,
  Field,
  Textarea,
  Card,
  tokens,
} from '@fluentui/react-components';
import { ChevronRight24Regular, ChevronDown24Regular, Info24Regular } from '@fluentui/react-icons';
import { useDispatch, useSelector } from 'react-redux';

import {
  alertDialogActions,
  RootState,
  useBasicInfoFilled,
  collegeListWorkshopActions,
  committeeReviewActions,
  interviewConversationActions,
  navigationTabActions,
} from '../../../store';

import {
  TaskType,
  useTaskRunner,
  collegeAdmissionDataService,
  CollegeListBuildRequest,
  BuildCollegeListTaskResult,
  TaskResult,
  GetCollegeDataChanceTaskResult,
  CollegeDataAndChanceRequest,
  ProgressModal,
  toCombinedCollegeData,
  RecommendEdEaRegularRequest,
  RecommendEdEaRegularTaskResult,
  applyDecisionService,
} from '../../component-service-proxy';

import {
  NavTabType,
  CollegePreferences,
  CollegeAdmissionData,
  toSimplifiedCollegeData,
  formatCollegeData,
} from '../../../shared';

import { AuthContext } from '../../../auth';
import { getCollegeNameKey } from '../../component-navigation-map';

import { ReviewDisplay } from '../../component-review-display/review-dislay';
import { CollegeListBuildForm } from './college-list-build-form';

import { useStyles } from './college-list-build-form.styles';
import { fuse } from '../../component-navigation-map/utils/fuzzy-config';
import { collegeMapping } from '../../component-navigation-map/college-mapping';

const collegeNameOptions = Array.from(collegeMapping.keys());

export const CollegeListBuildMainContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);
  const styles = useStyles();

  /* ------------------------------------------------------------------ */
  /* Redux state */
  const collegeList = useSelector((s: RootState) => s.collegeListWorkshop.collegeList);
  const collegePref: CollegePreferences = useSelector(
    (s: RootState) => s.collegePreferences.collegePreferences,
  );
  const majorPref = collegePref.specializedProgram.value;
  const decisionRecommendation = useSelector(
    (s: RootState) => s.collegeListWorkshop.recommendEdEaRegular,
  );

  const hasBasicInfoFilled = useBasicInfoFilled();

  /* ------------------------------------------------------------------ */
  /* Local state */
  const [selectedCollege, setSelectedCollege] = useState<CollegeAdmissionData | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCollegeName, setNewCollegeName] = useState<string>('');
  const [activeTask, setActiveTask] = useState<
    'collegeList' | 'evaluation' | 'recommendedearegular' | null
  >(null);
  const [showConfirmCleanUpDialogForCollegeList, setShowConfirmCleanUpDialogForCollegeList] =
    useState(false);
  const [showConfirmCleanUpDialogForApplyDecision, setShowConfirmCleanUpDialogForApplyDecision] =
    useState(false);

  const [additionalInfoToBuildCollegeList, setAdditionalInfoToBuildCollegeList] =
    useState<string>('');

  const [showDecisionRec, setShowDecisionRec] = useState(true);

  /* ------------------------------------------------------------------ */
  /* Autocomplete – memoised filtered options */
  const filteredCollegeNames = useMemo<string[]>(() => {
    if (!newCollegeName) return collegeNameOptions;
    return fuse.search(newCollegeName).slice(0, 20).map((r) => r.item);
  }, [newCollegeName]);

  /* ------------------------------------------------------------------ */
  /* Task runner – build list */
  const {
    startTask: startCollegeListTask,
    showModal: showCollegeListModal,
    progressMessage: progressCollegeListMessage,
  } = useTaskRunner({
    taskType: TaskType.BuildCollegeList,
    requestData: { additionalInfo: additionalInfoToBuildCollegeList } as CollegeListBuildRequest,
    onResult: async (data: TaskResult) => {
      const buildResult = data as BuildCollegeListTaskResult;

      // Include only colleges that resolve to a valid key
      const newItems: CollegeAdmissionData[] = buildResult.college_list.reduce<
        CollegeAdmissionData[]
      >((acc, c) => {
        const key = getCollegeNameKey(c.college);
        if (!key) return acc;

        acc.push({
          id: 0,
          user_id: userId as number,
          college: key,
          data: {
            admitRate: c.admitRate,
            undergradEnroll: c.undergradEnroll,
            annualCost: c.annualCost,
            nationalRanking: c.nationalRanking,
            programRanking: c.programRanking,
            chance: c.chance,
            category: c.category,
            reason: c.reason,
          },
        });
        return acc;
      }, []);

      try {
        const updated: CollegeAdmissionData[] = [];
        for (const item of newItems) {
          const id = await collegeAdmissionDataService.create(item);
          updated.push({ ...item, id });
        }
        dispatch(collegeListWorkshopActions.setCollegeList(updated));
      } finally {
        setActiveTask(null);
      }
    },
  });

  /* ------------------------------------------------------------------ */
  /* Task runner – evaluate college */
  const {
    startTask: startEvaluationTask,
    showModal: showEvaluationModal,
    progressMessage: progressEvaluationMessage,
  } = useTaskRunner({
    taskType: TaskType.GetCollegeDataChance,
    requestData: { college_name: selectedCollege?.college, major: majorPref } as CollegeDataAndChanceRequest,
    onResult: async (data: TaskResult) => {
      if (!selectedCollege) return;
      const result = data as GetCollegeDataChanceTaskResult;

      dispatch(
        collegeListWorkshopActions.setCollegeData({
          id: selectedCollege.id,
          data: toCombinedCollegeData(result.data_chance),
        }),
      );

      try {
        await collegeAdmissionDataService.update({
          ...selectedCollege,
          data: toCombinedCollegeData(result.data_chance),
        });
      } finally {
        setActiveTask(null);
      }
    },
  });

  /* ------------------------------------------------------------------ */
  /* Task runner – decision recommendation */
  const {
    startTask: startRecommendEdEaRegularTask,
    showModal: showEdEaRegularModal,
    progressMessage: progressEdEaRegularModalMessage,
  } = useTaskRunner({
    taskType: TaskType.RecommendEaEdRegular,
    requestData: {
      collegeList: formatCollegeData(toSimplifiedCollegeData(collegeList)),
      major: majorPref,
    } as RecommendEdEaRegularRequest,
    onResult: async (data: TaskResult) => {
      const result = data as RecommendEdEaRegularTaskResult;

      dispatch(collegeListWorkshopActions.setRecommendEdEaRegular(result.recommendation));
      try {
        await applyDecisionService.create({
          user_id: userId as number,
          decision: result.recommendation,
        });
      } finally {
        setActiveTask(null);
      }
    },
  });

  /* ------------------------------------------------------------------ */
  /* Helpers */
  const handleDeleteCollege = async (collegeId: number) => {
    const found = collegeList.find((c) => c.id === collegeId);
    if (!found) return;
    await collegeAdmissionDataService.deleteById(found.id, found.user_id);
    dispatch(collegeListWorkshopActions.deleteCollege(found.id));
    if (selectedCollege?.id === collegeId) setSelectedCollege(null);
  };

  const handleSelectCollege = (collegeItem: CollegeAdmissionData) => {
    setSelectedCollege(collegeItem);
    dispatch(committeeReviewActions.setLiveReviewCollege(collegeItem.college));
    dispatch(committeeReviewActions.setLiveReviewMajor(majorPref));
    dispatch(interviewConversationActions.setLiveConversationCollege(collegeItem.college));
    dispatch(interviewConversationActions.setLiveConversationMajor(majorPref));
  };

  /* ------------------------------------------------------------------ */
  /* Action panel handlers */
  const handleStartCollegeListTask = () => {
    if (!hasBasicInfoFilled) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Insufficient Information',
          message: 'Please fill in basic information in student profile before performing the task.',
        }),
      );
      return;
    }

    if (collegeList.length) setShowConfirmCleanUpDialogForCollegeList(true);
    else {
      setActiveTask('collegeList');
      startCollegeListTask();
    }
  };

  const handleRecommendEdEaRegularTask = () => {
    if (!hasBasicInfoFilled) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Insufficient Information',
          message: 'Please fill in basic information in student profile before performing the task.',
        }),
      );
      return;
    }

    if (decisionRecommendation.trim() !== '') {
      setShowConfirmCleanUpDialogForApplyDecision(true);
    } else {
      setActiveTask('recommendedearegular');
      startRecommendEdEaRegularTask();
    }
  };

  const handleStartEvaluationTask = () => {
    if (!hasBasicInfoFilled) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Insufficient Information',
          message: 'Please fill in basic information in student profile before performing the task.',
        }),
      );
      return;
    }
    if (!selectedCollege) return;

    setActiveTask('evaluation');
    startEvaluationTask();
  };

  const handleCommitteeReview = () => {
    if (selectedCollege) dispatch(navigationTabActions.setActiveTab(NavTabType.ComitteReview));
  };

  /* ------------------------------------------------------------------ */
  /* Clean‑up confirmation callbacks */
  const confirmCleanUpOkForCollegeList = async () => {
    setShowConfirmCleanUpDialogForCollegeList(false);

    try {
      for (const c of collegeList) await handleDeleteCollege(c.id);
    } catch {
      return;
    }
    setActiveTask('collegeList');
    startCollegeListTask();
  };

  const confirmCleanUpOkForApplyDecision = async () => {
    setShowConfirmCleanUpDialogForApplyDecision(false);

    try {
      await applyDecisionService.deleteById(userId as number);
    } catch {
      return;
    }

    setActiveTask('recommendedearegular');
    startRecommendEdEaRegularTask();
  };

  /* ------------------------------------------------------------------ */
  /* Add‑college dialog handlers */
  const handleAddCollegeDone = async () => {
    const key = getCollegeNameKey(newCollegeName.trim());
    if (!key) {
      dispatch(
        alertDialogActions.showAlert({ title: 'Validation Error', message: 'Invalid college name.' }),
      );
      return;
    }
    if (collegeList.some((c) => c.college === key)) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Validation Error',
          message: `${key} already exists in the list.`,
        }),
      );
      return;
    }

    const item = { id: 0, user_id: userId as number, college: key, data: undefined };
    const id = await collegeAdmissionDataService.create(item);
    dispatch(collegeListWorkshopActions.addCollege({ ...item, id }));
    setIsAddModalOpen(false);
    setNewCollegeName('');
  };

  /* Combobox handlers */
  const handleComboChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setNewCollegeName(ev.target.value);
  };

  const handleOptionSelect = (
    _ev: React.SyntheticEvent<Element, Event>,
    data: OptionOnSelectData,
  ) => {
    setNewCollegeName(data.optionValue as string);
  };

  /* ------------------------------------------------------------------ */
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL }}>
      {/* Progress modal */}
      <ProgressModal
        show={activeTask !== null && (showCollegeListModal || showEvaluationModal || showEdEaRegularModal)}
        message={
          activeTask === 'collegeList'
            ? progressCollegeListMessage
            : activeTask === 'evaluation'
            ? progressEvaluationMessage
            : activeTask === 'recommendedearegular'
            ? progressEdEaRegularModalMessage
            : ''
        }
      />

      {/* Clean‑up confirmation dialog */}
      {showConfirmCleanUpDialogForCollegeList && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Please be noticed…</h3>
            <p>Continuing this task will remove all current colleges in the list.</p>
            <div className={styles.modalButtonRow}>
              <Button appearance="primary" onClick={confirmCleanUpOkForCollegeList}>
                Ok
              </Button>
              <Button appearance="primary" onClick={() => setShowConfirmCleanUpDialogForCollegeList(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {showConfirmCleanUpDialogForApplyDecision && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Please be noticed…</h3>
            <p>Continuing this task will remove current recommendation for ED, EA and RD.</p>
            <div className={styles.modalButtonRow}>
              <Button appearance="primary" onClick={confirmCleanUpOkForApplyDecision}>
                Ok
              </Button>
              <Button appearance="primary" onClick={() => setShowConfirmCleanUpDialogForApplyDecision(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Action panel */}
      <Card className={styles.card}>
        <h2 className={styles.header}>Action Panel</h2>

        <div style={{ display: 'flex', gap: tokens.spacingHorizontalXL }}>
          {/* Build list */}
          <div className={styles.buttonWithInfo}>
            <Button appearance="primary" className={styles.actionPanelButton} onClick={handleStartCollegeListTask}>
              Build College List
            </Button>
            <Popover positioning={{ position: 'after', align: 'center' }}>
              <PopoverTrigger>
                <Button icon={<Info24Regular />} appearance="subtle" size="small" aria-label="Info" className={styles.infoIcon} />
              </PopoverTrigger>
              <PopoverSurface>Create a recommended college list</PopoverSurface>
            </Popover>
          </div>

          {/* Recommend ED/EA/RD */}
          <div className={styles.buttonWithInfo}>
            <Button appearance="primary" className={styles.actionPanelButton} onClick={handleRecommendEdEaRegularTask} disabled={collegeList.length === 0}>
              Recommend ED/EA/RD
            </Button>
            <Popover positioning={{ position: 'after', align: 'center' }}>
              <PopoverTrigger>
                <Button icon={<Info24Regular />} appearance="subtle" size="small" aria-label="Info" className={styles.infoIcon} />
              </PopoverTrigger>
              <PopoverSurface>Recommend Early Decision, Early Action and Regular Decision on colleges in the list</PopoverSurface>
            </Popover>
          </div>

          {/* Evaluate */}
          <div className={styles.buttonWithInfo}>
            <Button appearance="primary" className={styles.actionPanelButton} onClick={handleStartEvaluationTask} disabled={!selectedCollege || selectedCollege.data !== undefined}>
              Evaluate a College
            </Button>
            <Popover positioning={{ position: 'after', align: 'center' }}>
              <PopoverTrigger>
                <Button icon={<Info24Regular />} appearance="subtle" size="small" aria-label="Info" className={styles.infoIcon} />
              </PopoverTrigger>
              <PopoverSurface>Use “Add an Item” to create a row then select it to evaluate</PopoverSurface>
            </Popover>
          </div>

          {/* Holistic review */}
          <div className={styles.buttonWithInfo}>
            <Button appearance="primary" className={styles.actionPanelButton} onClick={handleCommitteeReview} disabled={!selectedCollege}>
              Holistic Review
            </Button>
            <Popover positioning={{ position: 'after', align: 'center' }}>
              <PopoverTrigger>
                <Button icon={<Info24Regular />} appearance="subtle" size="small" aria-label="Info" className={styles.infoIcon} />
              </PopoverTrigger>
              <PopoverSurface>Select a row for a comprehensive review</PopoverSurface>
            </Popover>
          </div>
        </div>

        {/* Additional Info textarea */}
        <Field
          className={styles.textAreaField}
          label={
            <span className={styles.labelContainer}>
              <span>Additional Info (Optional)</span>
              <Popover positioning={{ position: 'after', align: 'top' }}>
                <PopoverTrigger>
                  <Button icon={<Info24Regular />} appearance="subtle" size="small" aria-label="Essay information" className={styles.infoIcon} />
                </PopoverTrigger>
                <PopoverSurface>Please fill in any additional info or request needed to build the college list.</PopoverSurface>
              </Popover>
            </span>
          }
        >
          <Textarea
            resize="vertical"
            value={additionalInfoToBuildCollegeList}
            onChange={(_, data) => setAdditionalInfoToBuildCollegeList(data.value)}
            placeholder="Additional Info for Building College List ..."
            className={styles.textarea}
          />
        </Field>
      </Card>

      {/* ED/EA/RD Recommendation accordion */}
      {decisionRecommendation.trim() !== '' && (
        <Card className={styles.card}>
          <Accordion
            collapsible
            openItems={showDecisionRec ? ['rec'] : []}
            onToggle={(_, { openItems }) => setShowDecisionRec(openItems.includes('rec'))}
          >
            <AccordionItem value="rec">
              <AccordionHeader
                inline
                className={mergeClasses(styles.accordionHeader, showDecisionRec && styles.accordionHeaderActive)}
                expandIcon={showDecisionRec ? <ChevronDown24Regular /> : <ChevronRight24Regular />}
              >
                Recommendation on Early Decision, Early Action and Regular Decision
              </AccordionHeader>

              <AccordionPanel>
                <div className={styles.content}>
                  <ReviewDisplay review={decisionRecommendation} />
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Card>
      )}

      {/* Selected college reason */}
      {selectedCollege?.data?.reason && (
        <Card className={styles.card}>
          <h3 className={styles.reviewHeader}>My fit with this college</h3>
          <ReviewDisplay review={selectedCollege.data.reason} />
        </Card>
      )}

      {/* Data grid */}
      <CollegeListBuildForm
        collegeList={collegeList}
        selectedCollegeId={selectedCollege?.id}
        onSelectCollege={handleSelectCollege}
        onDeleteCollege={(id) => handleDeleteCollege(id)}
        onAddCollege={() => setIsAddModalOpen(true)}
      />

      {/* Add‑college dialog */}
      {isAddModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Add College</h3>
            <Combobox
              placeholder="Start typing a college..."
              value={newCollegeName}
              onChange={handleComboChange}
              onOptionSelect={handleOptionSelect}
              freeform
            >
              {filteredCollegeNames.map((name) => (
                <ComboboxOption key={name} value={name}>
                  {name}
                </ComboboxOption>
              ))}
            </Combobox>

            <div className={styles.modalButtonRow}>
              <Button
                appearance="primary"
                onClick={handleAddCollegeDone}
                disabled={!getCollegeNameKey(newCollegeName.trim())}
              >
                Done
              </Button>
              <Button appearance="primary" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
