import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  Field,
  Dropdown,
  Option,
  Button,
} from '@fluentui/react-components';

import { RootState } from '../../../store';
import { Major } from '../../../shared';

import {
  CollegeCompareRequest,
  CompareCollegeTaskResult,
  ProgressModal,
  TaskResult,
  TaskType,
  useTaskRunner,
} from '../../component-service-proxy';

import { ReviewDisplay } from '../../component-review-display/review-dislay';
import { useStyles } from './compare-college-main-container.styles';  

export const CompareCollegeMainContainer: React.FC = () => {
  const styles = useStyles();

  /* ---------- Redux data ---------- */
  const collegeList = useSelector(
    (s: RootState) => s.collegeListWorkshop.collegeList,
  );
  const collegeNames = collegeList.map((c) => c.college);

  /* ---------- Local state --------- */
  const [collegeA, setCollegeA] = useState<string>('');
  const [collegeB, setCollegeB] = useState<string>('');
  const [major, setMajor] = useState<Major | ''>('');
  const [result, setResult] = useState<string>('');

  /* ---------- Task runner --------- */
  const { startTask: runCompareTask, showModal, progressMessage } =
    useTaskRunner({
      taskType: TaskType.CompareCollege,
      requestData: {
        first_college: collegeA,
        second_college: collegeB,
        major,
      } as unknown as CollegeCompareRequest,
      onResult: (data: TaskResult) => {
        const { review } = data as CompareCollegeTaskResult;
        setResult(review);
      },
    });

  const canCompare = collegeA && collegeB && major && collegeA !== collegeB;

  /* ---------- JSX ---------- */
  return (
    <div className={styles.container}>
      {/* progress spinner */}
      <ProgressModal show={showModal} message={progressMessage} />

      {/* ---------- Action Panel ---------- */}
      <Card className={styles.card}>
        <h2 className={styles.header}>Action Panel</h2>

        {/* 1st row – three selects */}
        <div className={styles.selectRow}>
          <Field
            label="College A in Recommended List"
            className={styles.selectField}
          >
            <Dropdown
              placeholder="Select college"
              value={collegeA}
              onOptionSelect={(_, d) => setCollegeA(d.optionValue as string)}
            >
              {collegeNames.map((name) => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </Dropdown>
          </Field>

          <Field
            label="College B in Recommended List"
            className={styles.selectField}
          >
            <Dropdown
              placeholder="Select college"
              value={collegeB}
              onOptionSelect={(_, d) => setCollegeB(d.optionValue as string)}
            >
              {collegeNames.map((name) => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </Dropdown>
          </Field>

          <Field label="Major" className={styles.selectField}>
            <Dropdown
              placeholder="Select major"
              value={major}
              onOptionSelect={(_, d) => setMajor(d.optionValue as Major)}
            >
              {Object.values(Major).map((m) => (
                <Option key={m} value={m}>
                  {m}
                </Option>
              ))}
            </Dropdown>
          </Field>
        </div>

        {/* 2nd row – compare button */}
        <div className={styles.buttonRow}>
          <Button
            appearance="primary"
            disabled={!canCompare}
            onClick={() => runCompareTask()}
            className={styles.compareButton}
          >
            Compare
          </Button>
        </div>
      </Card>

      {/* ---------- Result ---------- */}
      {result && (
        <Card className={styles.card}>
          <h3 className={styles.resultHeader}>Comparison Result</h3>
          <ReviewDisplay review={result} />
        </Card>
      )}
    </div>
  );
};
